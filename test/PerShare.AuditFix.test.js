// ─────────────────────────────────────────────────────────────────────────────
// PER SHARE — TESTS CIBLÉS POST-AUDIT (FOCUS CRITICAL & FIXES)
// ─────────────────────────────────────────────────────────────────────────────
// Ces tests valident spécifiquement que les failles identifiées par
// l'audit SPYWOLF sont définitivement corrigées, et que les nouvelles
// mécaniques (depositTokens, per-share accounting, pull pattern)
// fonctionnent comme prévu.
// ─────────────────────────────────────────────────────────────────────────────

const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

const USDT = (n) => ethers.parseEther(n.toString());
const TOKENS = (n) => ethers.parseEther(n.toString());

describe("PerShare — Audit Fixes (Critical Focus)", function () {
  let perShare, usdt, presaleToken, platformToken, blacklistToken, fotToken;
  let owner, alice, bob, charles, hacker, feeRecipient;
  let perShareAddress, presaleTokenAddress, blacklistTokenAddress;
  let stranger;

  const MIN_TOKEN_FOR_ZERO_FEE = ethers.parseEther("10000");

  beforeEach(async function () {
    [owner, alice, bob, charles, hacker, stranger] = await ethers.getSigners();
    feeRecipient = owner;

    // 1. USDT Mock
    const MockUSDT = await ethers.getContractFactory("MockUSDT");
    usdt = await MockUSDT.deploy();

    // 2. Presale Token Mock
    const MockPresaleToken = await ethers.getContractFactory("MockPresaleToken");
    presaleToken = await MockPresaleToken.deploy();
    presaleTokenAddress = await presaleToken.getAddress();

    // 3. Platform Token Mock
    const MockToken = await ethers.getContractFactory("MockToken");
    platformToken = await MockToken.deploy("SHARE", "SHARE", 18);
    await platformToken.mint(alice.address, MIN_TOKEN_FOR_ZERO_FEE);

    // 4. Blacklist Token (pour tester le Pull Pattern)
    const MockBlacklistToken = await ethers.getContractFactory("MockBlacklistToken");
    blacklistToken = await MockBlacklistToken.deploy("BLT", "BLT", 18);
    blacklistTokenAddress = await blacklistToken.getAddress();

    // 5. Fee-On-Transfer Token
    const MockFOTToken = await ethers.getContractFactory("MockFOTToken");
    fotToken = await MockFOTToken.deploy("FOT", "FOT", 18, 5); // 5% de frais

    // 6. PerShare
    const PerShare = await ethers.getContractFactory("PerShare");
    perShare = await PerShare.deploy(feeRecipient.address);
    perShareAddress = await perShare.getAddress();

    // 7. Faucets
    await usdt.faucet(alice.address, USDT(10000));
    await usdt.faucet(bob.address, USDT(10000));
    await usdt.faucet(charles.address, USDT(10000));
    await usdt.faucet(hacker.address, USDT(10000));

    await blacklistToken.mint(alice.address, TOKENS(10000));
    await blacklistToken.mint(bob.address, TOKENS(10000));
    // Alice est blacklistée sur ce token
    await blacklistToken.setBlacklist(alice.address, true);

    await fotToken.mint(alice.address, TOKENS(10000));
    await fotToken.mint(bob.address, TOKENS(10000));
    await fotToken.mint(owner.address, TOKENS(10000)); // Needed for owner tests
  });

  // ─── Helpers ──────────────────────────────────────────────────────────────

  async function createShare(members, stablecoin, target, deadline, threshold) {
    await perShare.createShare(
      "Test",
      members,
      stablecoin,
      stranger.address,
      target,
      deadline,
      threshold
    );
    return 0;
  }

  async function contribute(signer, id, amount, token = usdt) {
    await token.connect(signer).approve(perShareAddress, amount);
    await perShare.connect(signer).contribute(id, amount);
  }

  async function depositPresaleTokens(signer, id, amount) {
    await presaleToken.connect(signer).approve(perShareAddress, amount);
    await perShare.connect(signer).depositTokens(id, amount);
  }

  // ─── Utility Time function for hardhat ───
  async function advanceTime(seconds) {
    await network.provider.send("evm_increaseTime", [seconds]);
    await network.provider.send("evm_mine");
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // TEST 1 — CRITICAL FIX : Cross-share drain
  // ─────────────────────────────────────────────────────────────────────────────

  describe("🔴 Critical Fix: Cross-share drain", function () {
    let deadline, honestId, attackerId;

    beforeEach(async function () {
      deadline = (await time.latest()) + 86400;

      // SHARE 1 : Honnête (Alice, Bob, Charles) - USDT
      await perShare.createShare(
        "Honest Share",
        [alice.address, bob.address, charles.address],
        await usdt.getAddress(),
        stranger.address,
        USDT(1000),
        deadline,
        2
      );
      honestId = 0;
      await contribute(alice, honestId, USDT(400));
      await contribute(bob, honestId, USDT(400));
      await contribute(charles, honestId, USDT(200));
      await perShare.connect(alice).validate(honestId);
      await perShare.connect(bob).validate(honestId);
    });

    it("❌ setExpectedToken ne peut PAS être le stablecoin", async function () {
      const deadline2 = (await time.latest()) + 86400;
      await perShare.connect(hacker).createShare(
        "Attacker Share",
        [hacker.address, alice.address], // 2 membres
        await usdt.getAddress(),
        stranger.address,
        USDT(100),
        deadline2,
        1
      );
      const attId = 1;
      await contribute(hacker, attId, USDT(100));
      await perShare.connect(hacker).validate(attId);

      await expect(
        perShare.connect(hacker).setExpectedToken(attId, await usdt.getAddress())
      ).to.be.revertedWith("PerShare: cannot be stablecoin");
    });

    it("❌ Un token ne peut être assigné qu'à un seul SHARE (isExpectedToken permanent)", async function () {
      await perShare.connect(owner).setExpectedToken(honestId, presaleTokenAddress);

      const deadline2 = (await time.latest()) + 86400;
      await perShare.connect(hacker).createShare(
        "Attacker Share",
        [hacker.address, alice.address],
        await usdt.getAddress(),
        stranger.address,
        USDT(100),
        deadline2,
        1
      );
      const attId = 1;
      await contribute(hacker, attId, USDT(100));
      await perShare.connect(hacker).validate(attId);

      await expect(
        perShare.connect(hacker).setExpectedToken(attId, presaleTokenAddress)
      ).to.be.revertedWith("PerShare: token already assigned to another share");
    });

    it("✅ validateDistribution utilise totalTokensReceived (pas balanceOf)", async function () {
      await perShare.connect(owner).setExpectedToken(honestId, presaleTokenAddress);
      await depositPresaleTokens(owner, honestId, TOKENS(1000));

      await perShare.connect(alice).validateDistribution(honestId, presaleTokenAddress);
      await perShare.connect(bob).validateDistribution(honestId, presaleTokenAddress);

      const status = await perShare.getShareStatus(honestId);
      expect(status.tokensDistributed).to.be.true;

      expect(await presaleToken.balanceOf(perShareAddress)).to.equal(TOKENS(1000));

      const deadline2 = (await time.latest()) + 86400;
      await perShare.connect(hacker).createShare(
        "Attacker Share",
        [hacker.address, alice.address],
        await usdt.getAddress(),
        stranger.address,
        USDT(100),
        deadline2,
        1
      );
      const attId = 1;
      await contribute(hacker, attId, USDT(100));
      await perShare.connect(hacker).validate(attId);

      await expect(
        perShare.connect(hacker).setExpectedToken(attId, presaleTokenAddress)
      ).to.be.revertedWith("PerShare: token already assigned to another share");

      const MockToken2 = await ethers.getContractFactory("MockToken");
      const token2 = await MockToken2.deploy("T2", "T2", 18);
      await perShare.connect(hacker).setExpectedToken(attId, await token2.getAddress());

      await expect(
        perShare.connect(hacker).validateDistribution(attId, await token2.getAddress())
      ).to.be.revertedWith("PerShare: no tokens deposited for this share");

      expect(await presaleToken.balanceOf(perShareAddress)).to.equal(TOKENS(1000));
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // TEST 2 — HIGH FIX : Reverting recipient (Pull Pattern)
  // ─────────────────────────────────────────────────────────────────────────────

  describe("🟠 High Fix: Reverting recipient (Pull Pattern)", function () {
    let deadline, id;

    beforeEach(async function () {
      deadline = (await time.latest()) + 86400;

      await perShare.createShare(
        "Blacklist Test",
        [alice.address, bob.address],
        blacklistTokenAddress,
        stranger.address,
        TOKENS(2000), // Augmenter target pour éviter d'être SENT
        deadline,
        1
      );
      id = 0;

      // Ne blacklister Alice qu'APRÈS sa contribution (pour simuler un blacklist a posteriori)
      await blacklistToken.setBlacklist(alice.address, false);
      await blacklistToken.connect(alice).approve(perShareAddress, TOKENS(500));
      await blacklistToken.connect(bob).approve(perShareAddress, TOKENS(500));
      await perShare.connect(alice).contribute(id, TOKENS(500));
      await perShare.connect(bob).contribute(id, TOKENS(500));
      // await perShare.connect(alice).validate(id); // DO NOT validate since target is not reached!
      await blacklistToken.setBlacklist(alice.address, true);
    });

    it("✅ Refund : un membre blacklisté ne bloque pas les autres", async function () {
      await advanceTime(86401);
      await perShare.connect(alice).markRefunded(id);

      const bobBefore = await blacklistToken.balanceOf(bob.address);
      await perShare.connect(bob).claimRefund(id);
      expect(await blacklistToken.balanceOf(bob.address) - bobBefore).to.equal(TOKENS(500));

      await expect(
        perShare.connect(alice).claimRefund(id)
      ).to.be.reverted; 
    });

    it("✅ Distribution : un membre blacklisté ne bloque pas les autres (pull pattern)", async function () {
      const deadline2 = (await time.latest()) + 86400;
      await perShare.createShare(
        "Dist Blacklist Test",
        [alice.address, bob.address],
        await usdt.getAddress(),
        stranger.address,
        USDT(1000),
        deadline2,
        1
      );
      const id2 = 1;
      await contribute(alice, id2, USDT(500));
      await contribute(bob, id2, USDT(500));
      await perShare.connect(alice).validate(id2);

      const MockBLT = await ethers.getContractFactory("MockBlacklistToken");
      const distToken = await MockBLT.deploy("DIST", "DIST", 18);
      await distToken.setBlacklist(alice.address, true);
      
      // depositTokens
      await distToken.mint(owner.address, TOKENS(1000));
      await distToken.connect(owner).approve(perShareAddress, TOKENS(1000));
      await perShare.connect(owner).setExpectedToken(id2, await distToken.getAddress());
      await perShare.connect(owner).depositTokens(id2, TOKENS(1000));
      
      await perShare.connect(alice).validateDistribution(id2, await distToken.getAddress());

      const bobBefore = await distToken.balanceOf(bob.address);
      await perShare.connect(bob).claimDistribution(id2);
      expect(await distToken.balanceOf(bob.address) - bobBefore).to.equal(TOKENS(500));

      await expect(
        perShare.connect(alice).claimDistribution(id2)
      ).to.be.reverted;
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // TEST 3 — MEDIUM FIX : Fee-on-transfer (Delta balance)
  // ─────────────────────────────────────────────────────────────────────────────

  describe("🟡 Medium Fix: Fee-on-transfer (Delta balance)", function () {
    let deadline, id;

    beforeEach(async function () {
      deadline = (await time.latest()) + 86400;
      await perShare.createShare(
        "FOT Test",
        [alice.address, bob.address],
        await fotToken.getAddress(),
        stranger.address,
        TOKENS(1000),
        deadline,
        1
      );
      id = 0;
    });

    it("✅ contribute crédite le montant réellement reçu (5% de frais)", async function () {
      await fotToken.connect(alice).approve(perShareAddress, TOKENS(1000));
      await perShare.connect(alice).contribute(id, TOKENS(1000));

      const contrib = await perShare.getContribution(id, alice.address);
      expect(contrib).to.equal(TOKENS(950));
    });

    it("✅ depositTokens crédite le montant réellement reçu", async function () {
      const deadline2 = (await time.latest()) + 86400;
      await perShare.createShare(
        "FOT Deposit Test",
        [alice.address, bob.address],
        await usdt.getAddress(),
        stranger.address,
        USDT(1000),
        deadline2,
        1
      );
      const id2 = 1;
      await contribute(alice, id2, USDT(500));
      await contribute(bob, id2, USDT(500));
      await perShare.connect(alice).validate(id2);

      await perShare.connect(owner).setExpectedToken(id2, await fotToken.getAddress());

      await fotToken.connect(owner).approve(perShareAddress, TOKENS(1000));
      await perShare.connect(owner).depositTokens(id2, TOKENS(1000));

      await perShare.connect(alice).validateDistribution(id2, await fotToken.getAddress());
      const aliceBefore = await fotToken.balanceOf(alice.address);
      await perShare.connect(alice).claimDistribution(id2);
      
      // 50% of 950 = 475
      expect(await fotToken.balanceOf(alice.address) - aliceBefore).to.equal(ethers.parseEther("451.25")); // 475 FOT - 5% fee during transfer
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // TEST 4 — MEDIUM FIX : Post-deadline race (validate bloqué)
  // ─────────────────────────────────────────────────────────────────────────────

  describe("🟡 Medium Fix: Post-deadline race", function () {
    let deadline, id;

    beforeEach(async function () {
      deadline = (await time.latest()) + 86400;
      await perShare.createShare(
        "Race Test",
        [alice.address, bob.address],
        await usdt.getAddress(),
        stranger.address,
        USDT(1000),
        deadline,
        2
      );
      id = 0;
      await contribute(alice, id, USDT(500));
      await contribute(bob, id, USDT(500));
    });

    it("✅ validate() échoue après la deadline", async function () {
      await advanceTime(86401);
      await expect(
        perShare.connect(alice).validate(id)
      ).to.be.revertedWith("PerShare: deadline passed");
    });

    it("✅ markRefunded() réussit après la deadline (pas de conflit)", async function () {
      await advanceTime(86401);
      await expect(perShare.connect(alice).markRefunded(id)).to.not.be.reverted;
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // TEST 5 — LOW FIX : Sweep sécurisé
  // ─────────────────────────────────────────────────────────────────────────────

  describe("🟢 Low Fix: Sweep sécurisé", function () {
    let deadline, id;

    beforeEach(async function () {
      deadline = (await time.latest()) + 86400;
      await perShare.createShare(
        "Sweep Test",
        [alice.address, bob.address],
        await usdt.getAddress(),
        stranger.address,
        USDT(1000),
        deadline,
        1
      );
      id = 0;
      await contribute(alice, id, USDT(500));
      await contribute(bob, id, USDT(500));
      await perShare.connect(alice).validate(id);

      await perShare.connect(owner).setExpectedToken(id, presaleTokenAddress);
    });

    it("❌ Ne peut pas sweeper un stablecoin", async function () {
      await usdt.transfer(perShareAddress, USDT(100));
      await expect(
        perShare.sweepLostTokens(await usdt.getAddress(), owner.address)
      ).to.be.revertedWith("PerShare: token is a stablecoin");
    });

    it("❌ Ne peut pas sweeper un token réservé (expectedToken)", async function () {
      await presaleToken.transfer(perShareAddress, TOKENS(100));
      await expect(
        perShare.sweepLostTokens(presaleTokenAddress, owner.address)
      ).to.be.revertedWith("PerShare: token is reserved for a share");
    });

    it("✅ Peut sweeper un token inconnu (non réservé, non stablecoin)", async function () {
      const LostToken = await ethers.getContractFactory("MockToken");
      const lost = await LostToken.deploy("LOST", "LOST", 18);
      await lost.mint(perShareAddress, TOKENS(100));

      const ownerBefore = await lost.balanceOf(owner.address);
      await perShare.sweepLostTokens(await lost.getAddress(), owner.address);
      expect(await lost.balanceOf(owner.address) - ownerBefore).to.equal(TOKENS(100));
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // TEST 6 — NEW FEATURE : depositTokens (explicit accounting)
  // ─────────────────────────────────────────────────────────────────────────────

  describe("🆕 New Feature: depositTokens (explicit accounting)", function () {
    let deadline, id;

    beforeEach(async function () {
      deadline = (await time.latest()) + 86400;
      await perShare.createShare(
        "Deposit Test",
        [alice.address, bob.address],
        await usdt.getAddress(),
        stranger.address,
        USDT(1000),
        deadline,
        2
      );
      id = 0;
      await contribute(alice, id, USDT(500));
      await contribute(bob, id, USDT(500));
      await perShare.connect(alice).validate(id);
      await perShare.connect(bob).validate(id);
      await perShare.connect(owner).setExpectedToken(id, presaleTokenAddress);
    });

    it("✅ Les tokens doivent être déposés explicitement avant la distribution", async function () {
      await perShare.connect(alice).validateDistribution(id, presaleTokenAddress);
      await expect(
        perShare.connect(bob).validateDistribution(id, presaleTokenAddress) // Bob is the 2nd validation, triggers the check
      ).to.be.revertedWith("PerShare: no tokens deposited for this share");

      await depositPresaleTokens(owner, id, TOKENS(1000));

      // Alice already validated successfully, only Bob needs to validate now to reach the threshold and successfully distribute
      await perShare.connect(bob).validateDistribution(id, presaleTokenAddress);

      const status = await perShare.getShareStatus(id);
      expect(status.tokensDistributed).to.be.true;
    });

    it("✅ Les tokens déposés appartiennent au SHARE et non au contrat global", async function () {
      await depositPresaleTokens(owner, id, TOKENS(500));

      await perShare.connect(alice).validateDistribution(id, presaleTokenAddress);
      await perShare.connect(bob).validateDistribution(id, presaleTokenAddress);

      const aliceBefore = await presaleToken.balanceOf(alice.address);
      await perShare.connect(alice).claimDistribution(id);
      expect(await presaleToken.balanceOf(alice.address) - aliceBefore).to.equal(TOKENS(250)); // 50% de 500

      const bobBefore = await presaleToken.balanceOf(bob.address);
      await perShare.connect(bob).claimDistribution(id);
      expect(await presaleToken.balanceOf(bob.address) - bobBefore).to.equal(TOKENS(250)); // 50% de 500
    });

    it("✅ Late tranche : nouveau dépôt après distribution", async function () {
      await depositPresaleTokens(owner, id, TOKENS(500));
      await perShare.connect(alice).validateDistribution(id, presaleTokenAddress);
      await perShare.connect(bob).validateDistribution(id, presaleTokenAddress);

      await perShare.connect(alice).claimDistribution(id);
      await perShare.connect(bob).claimDistribution(id);

      await depositPresaleTokens(owner, id, TOKENS(300));

      const aliceBefore = await presaleToken.balanceOf(alice.address);
      const bobBefore = await presaleToken.balanceOf(bob.address);
      await perShare.connect(alice).claimDistribution(id);
      await perShare.connect(bob).claimDistribution(id);

      expect(await presaleToken.balanceOf(alice.address) - aliceBefore).to.equal(TOKENS(150));
      expect(await presaleToken.balanceOf(bob.address) - bobBefore).to.equal(TOKENS(150));
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // TEST 7 — FULL INTEGRATION (Happy Path avec depositTokens)
  // ─────────────────────────────────────────────────────────────────────────────

  describe("✅ Full Integration — Happy Path", function () {
    it("Effectue un group buy complet (Phase 1 + Phase 2) avec depositTokens", async function () {
      const deadline = (await time.latest()) + 86400;

      await perShare.createShare(
        "Full Flow",
        [alice.address, bob.address, charles.address],
        await usdt.getAddress(),
        stranger.address,
        USDT(1000),
        deadline,
        2
      );
      const id = 0;

      await contribute(alice, id, USDT(400));
      await contribute(bob, id, USDT(400));
      await contribute(charles, id, USDT(200));

      await perShare.connect(alice).validate(id);
      await perShare.connect(bob).validate(id);

      expect(await usdt.balanceOf(stranger.address)).to.equal(USDT(990));

      await perShare.connect(owner).setExpectedToken(id, presaleTokenAddress);

      await depositPresaleTokens(owner, id, TOKENS(1000));

      await perShare.connect(alice).validateDistribution(id, presaleTokenAddress);
      await perShare.connect(bob).validateDistribution(id, presaleTokenAddress);

      const aliceBefore = await presaleToken.balanceOf(alice.address);
      const bobBefore = await presaleToken.balanceOf(bob.address);
      const charlesBefore = await presaleToken.balanceOf(charles.address);

      await perShare.connect(alice).claimDistribution(id);
      await perShare.connect(bob).claimDistribution(id);
      await perShare.connect(charles).claimDistribution(id);

      expect(await presaleToken.balanceOf(alice.address) - aliceBefore).to.equal(TOKENS(400));
      expect(await presaleToken.balanceOf(bob.address) - bobBefore).to.equal(TOKENS(400));
      expect(await presaleToken.balanceOf(charles.address) - charlesBefore).to.equal(TOKENS(200));

      expect(await presaleToken.balanceOf(perShareAddress)).to.equal(0);
    });
  });
});
