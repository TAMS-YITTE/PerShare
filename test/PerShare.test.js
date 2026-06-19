const { expect }      = require("chai");
const { ethers }      = require("hardhat");
const { time }        = require("@nomicfoundation/hardhat-network-helpers");

describe("PerShare", function () {

  let perShare, usdt, presaleToken;
  let owner, alice, bob, charles, stranger;
  let usdtAddress, perShareAddress, presaleTokenAddress;

  const USDT   = (n) => ethers.parseEther(n.toString());
  const TOKENS = (n) => ethers.parseEther(n.toString());

  beforeEach(async function () {
    [owner, alice, bob, charles, stranger] = await ethers.getSigners();

    const MockUSDT = await ethers.getContractFactory("MockUSDT");
    usdt = await MockUSDT.deploy();
    usdtAddress = await usdt.getAddress();

    const MockPresaleToken = await ethers.getContractFactory("MockPresaleToken");
    presaleToken = await MockPresaleToken.deploy();
    presaleTokenAddress = await presaleToken.getAddress();

    const PerShare = await ethers.getContractFactory("PerShare");
    perShare = await PerShare.deploy(owner.address);
    perShareAddress = await perShare.getAddress();

    await usdt.faucet(alice.address,   USDT(10000));
    await usdt.faucet(bob.address,     USDT(10000));
    await usdt.faucet(charles.address, USDT(10000));
  });

  // ─── HELPERS ──────────────────────────────────────────────────────────────

  async function createBasicShare(destination, deadline, threshold = 2) {
    return perShare.connect(alice).createShare(
      "Test SHARE",
      [alice.address, bob.address, charles.address],
      usdtAddress,
      destination,
      USDT(1000),
      deadline,
      threshold
    );
  }

  async function approveAndContribute(signer, id, amount) {
    await usdt.connect(signer).approve(perShareAddress, USDT(amount));
    await perShare.connect(signer).contribute(id, USDT(amount));
  }

  // ─── 1. CREATION ──────────────────────────────────────────────────────────

  describe("createShare", function () {

    it("cree un SHARE avec les bons parametres", async function () {
      const deadline = (await time.latest()) + 86400;
      await perShare.createShare(
        "Voyage Lisbonne",
        [alice.address, bob.address, charles.address],
        usdtAddress,
        stranger.address,
        USDT(3000),
        deadline,
        2
      );

      const [name, , , dest, target, , threshold] = await perShare.getShareDetails(0);
      const members = await perShare.getShareMembers(0);
      const [, , , sent, refunded, , expectedToken] = await perShare.getShareStatus(0);

      expect(name).to.equal("Voyage Lisbonne");
      expect(members.length).to.equal(3);
      expect(dest).to.equal(stranger.address);
      expect(target).to.equal(USDT(3000));
      expect(threshold).to.equal(2);
      expect(sent).to.be.false;
      expect(refunded).to.be.false;
      expect(expectedToken).to.equal(ethers.ZeroAddress);
    });

    it("incremente shareCount", async function () {
      const deadline = (await time.latest()) + 86400;
      await createBasicShare(stranger.address, deadline);
      expect(await perShare.shareCount()).to.equal(1);
    });

    it("refuse moins de 2 membres", async function () {
      const deadline = (await time.latest()) + 86400;
      await expect(
        perShare.createShare("Test", [alice.address], usdtAddress, stranger.address, USDT(100), deadline, 1)
      ).to.be.revertedWith("PerShare: min 2 members");
    });

    it("refuse un membre en double", async function () {
      const deadline = (await time.latest()) + 86400;
      await expect(
        perShare.createShare("Test", [alice.address, alice.address], usdtAddress, stranger.address, USDT(100), deadline, 1)
      ).to.be.revertedWith("PerShare: duplicate member");
    });

    it("refuse destination zero address", async function () {
      const deadline = (await time.latest()) + 86400;
      await expect(
        perShare.createShare("Test", [alice.address, bob.address], usdtAddress, ethers.ZeroAddress, USDT(100), deadline, 1)
      ).to.be.revertedWith("PerShare: invalid destination");
    });

    it("refuse threshold superieur au nombre de membres", async function () {
      const deadline = (await time.latest()) + 86400;
      await expect(
        perShare.createShare("Test", [alice.address, bob.address], usdtAddress, stranger.address, USDT(100), deadline, 5)
      ).to.be.revertedWith("PerShare: threshold > members");
    });

    it("refuse une deadline dans le passe", async function () {
      const pastDeadline = (await time.latest()) - 1;
      await expect(
        perShare.createShare("Test", [alice.address, bob.address], usdtAddress, stranger.address, USDT(100), pastDeadline, 1)
      ).to.be.revertedWith("PerShare: deadline must be in future");
    });

    it("emet ShareCreated", async function () {
      const deadline = (await time.latest()) + 86400;
      await expect(createBasicShare(stranger.address, deadline))
        .to.emit(perShare, "ShareCreated");
    });
  });

  // ─── 2. CONTRIBUTIONS ─────────────────────────────────────────────────────

  describe("contribute", function () {

    let id, deadline;

    beforeEach(async function () {
      deadline = (await time.latest()) + 86400;
      await createBasicShare(stranger.address, deadline);
      id = 0;
    });

    it("enregistre la contribution correctement", async function () {
      await approveAndContribute(alice, id, 400);
      expect(await perShare.getContribution(id, alice.address)).to.equal(USDT(400));
    });

    it("met a jour totalReceived", async function () {
      await approveAndContribute(alice, id, 400);
      await approveAndContribute(bob,   id, 400);
      const [collected] = await perShare.getProgress(id);
      expect(collected).to.equal(USDT(800));
    });

    it("accepte des contributions multiples du meme membre", async function () {
      await approveAndContribute(alice, id, 300);
      await approveAndContribute(alice, id, 200);
      expect(await perShare.getContribution(id, alice.address)).to.equal(USDT(500));
    });

    it("refuse un non-membre", async function () {
      await usdt.connect(stranger).approve(perShareAddress, USDT(100));
      await expect(
        perShare.connect(stranger).contribute(id, USDT(100))
      ).to.be.revertedWith("PerShare: not a member");
    });

    it("refuse apres la deadline", async function () {
      await time.increaseTo(deadline + 1);
      await usdt.connect(alice).approve(perShareAddress, USDT(100));
      await expect(
        perShare.connect(alice).contribute(id, USDT(100))
      ).to.be.revertedWith("PerShare: deadline passed");
    });

    it("emet ContributionReceived", async function () {
      await usdt.connect(alice).approve(perShareAddress, USDT(400));
      await expect(perShare.connect(alice).contribute(id, USDT(400)))
        .to.emit(perShare, "ContributionReceived")
        .withArgs(id, alice.address, USDT(400), USDT(400));
    });
  });

  // ─── 3. VALIDATION ET ENVOI ───────────────────────────────────────────────

  describe("validate + envoi", function () {

    let id, deadline, destAddress;

    beforeEach(async function () {
      deadline    = (await time.latest()) + 86400;
      destAddress = stranger.address;
      await createBasicShare(destAddress, deadline, 2);
      id = 0;

      await approveAndContribute(alice,   id, 400);
      await approveAndContribute(bob,     id, 400);
      await approveAndContribute(charles, id, 200);
    });

    it("enregistre la validation", async function () {
      await perShare.connect(alice).validate(id);
      expect(await perShare.hasValidated(id, alice.address)).to.be.true;
      expect(await perShare.validationCount(id)).to.equal(1);
    });

    it("envoie les fonds quand threshold atteint", async function () {
      const destBefore = await usdt.balanceOf(destAddress);
      await perShare.connect(alice).validate(id);
      await perShare.connect(bob).validate(id);
      const destAfter = await usdt.balanceOf(destAddress);
      expect(destAfter - destBefore).to.equal(USDT(990)); // 1000 - 1%
    });

    it("preleve 1% de commission vers owner", async function () {
      const ownerBefore = await usdt.balanceOf(owner.address);
      await perShare.connect(alice).validate(id);
      await perShare.connect(bob).validate(id);
      const ownerAfter = await usdt.balanceOf(owner.address);
      expect(ownerAfter - ownerBefore).to.equal(USDT(10));
    });

    it("marque le SHARE comme envoye", async function () {
      await perShare.connect(alice).validate(id);
      await perShare.connect(bob).validate(id);
      const [, , , sent] = await perShare.getShareStatus(id);
      expect(sent).to.be.true;
    });

    it("refuse la double validation", async function () {
      await perShare.connect(alice).validate(id);
      await expect(
        perShare.connect(alice).validate(id)
      ).to.be.revertedWith("PerShare: already validated");
    });

    it("refuse si objectif pas atteint", async function () {
      const deadline2 = (await time.latest()) + 86400;
      await perShare.createShare(
        "SHARE Partiel", [alice.address, bob.address], usdtAddress,
        destAddress, USDT(5000), deadline2, 1
      );
      await approveAndContribute(alice, 1, 100);
      await expect(
        perShare.connect(alice).validate(1)
      ).to.be.revertedWith("PerShare: target not reached");
    });

    it("emet FundsSent", async function () {
      await perShare.connect(alice).validate(id);
      await expect(perShare.connect(bob).validate(id))
        .to.emit(perShare, "FundsSent")
        .withArgs(id, destAddress, USDT(990), USDT(10));
    });
  });

  // ─── 4. REMBOURSEMENT ─────────────────────────────────────────────────────

  describe("refund", function () {

    let id, deadline;

    beforeEach(async function () {
      deadline = (await time.latest()) + 86400;
      await createBasicShare(stranger.address, deadline);
      id = 0;

      await approveAndContribute(alice,   id, 400);
      await approveAndContribute(bob,     id, 350);
      await approveAndContribute(charles, id, 200);
    });

    it("rembourse chaque membre exactement", async function () {
      await time.increaseTo(deadline + 1);

      const aliceBefore   = await usdt.balanceOf(alice.address);
      const bobBefore     = await usdt.balanceOf(bob.address);
      const charlesBefore = await usdt.balanceOf(charles.address);

      await perShare.connect(alice).refund(id);

      expect(await usdt.balanceOf(alice.address)   - aliceBefore).to.equal(USDT(400));
      expect(await usdt.balanceOf(bob.address)     - bobBefore).to.equal(USDT(350));
      expect(await usdt.balanceOf(charles.address) - charlesBefore).to.equal(USDT(200));
    });

    it("marque le SHARE comme rembourse", async function () {
      await time.increaseTo(deadline + 1);
      await perShare.connect(alice).refund(id);
      const [, , , , refunded] = await perShare.getShareStatus(id);
      expect(refunded).to.be.true;
    });

    it("refuse avant la deadline", async function () {
      await expect(perShare.connect(alice).refund(id))
        .to.be.revertedWith("PerShare: deadline not passed yet");
    });

    it("refuse un second remboursement", async function () {
      await time.increaseTo(deadline + 1);
      await perShare.connect(alice).refund(id);
      await expect(perShare.connect(alice).refund(id))
        .to.be.revertedWith("PerShare: already refunded");
    });

    it("refuse le remboursement si pas membre", async function () {
      await time.increaseTo(deadline + 1);
      await expect(perShare.connect(stranger).refund(id))
        .to.be.revertedWith("PerShare: not a member");
    });

    it("emet FundsRefunded", async function () {
      await time.increaseTo(deadline + 1);
      await expect(perShare.connect(alice).refund(id))
        .to.emit(perShare, "FundsRefunded")
        .withArgs(id, USDT(950));
    });
  });

  // ─── 5. PHASE 2 — GROUP BUY PRESALE ──────────────────────────────────────

  describe("validateDistribution — Phase 2 group buy", function () {

    let id, deadline;

    beforeEach(async function () {
      deadline = (await time.latest()) + 86400;
      await createBasicShare(stranger.address, deadline, 2);
      id = 0;

      // Alice 40% / Bob 40% / Charles 20%
      await approveAndContribute(alice,   id, 400);
      await approveAndContribute(bob,     id, 400);
      await approveAndContribute(charles, id, 200);

      // Phase 1 terminee
      await perShare.connect(alice).validate(id);
      await perShare.connect(bob).validate(id);

      // Set expected token
      await perShare.connect(alice).setExpectedToken(id, presaleTokenAddress);

      // Presale envoie 1000 tokens vers PerShare
      await presaleToken.sendToShare(perShareAddress, TOKENS(1000));
    });

    it("redistribue les tokens proportionnellement", async function () {
      const aliceBefore   = await presaleToken.balanceOf(alice.address);
      const bobBefore     = await presaleToken.balanceOf(bob.address);
      const charlesBefore = await presaleToken.balanceOf(charles.address);

      await perShare.connect(alice).validateDistribution(id, presaleTokenAddress);
      await perShare.connect(bob).validateDistribution(id, presaleTokenAddress);

      expect(await presaleToken.balanceOf(alice.address)   - aliceBefore).to.equal(TOKENS(400));
      expect(await presaleToken.balanceOf(bob.address)     - bobBefore).to.equal(TOKENS(400));
      expect(await presaleToken.balanceOf(charles.address) - charlesBefore).to.equal(TOKENS(200));
    });

    it("marque tokensDistributed = true", async function () {
      await perShare.connect(alice).validateDistribution(id, presaleTokenAddress);
      await perShare.connect(bob).validateDistribution(id, presaleTokenAddress);
      const [, , , , , tokensDistributed] = await perShare.getShareStatus(id);
      expect(tokensDistributed).to.be.true;
    });

    it("refuse si phase 1 pas terminee", async function () {
      const deadline2 = (await time.latest()) + 86400;
      await perShare.createShare(
        "SHARE 2", [alice.address, bob.address], usdtAddress,
        stranger.address, USDT(1000), deadline2, 2
      );
      await approveAndContribute(alice, 1, 500);
      await approveAndContribute(bob,   1, 500);
      await expect(
        perShare.connect(alice).validateDistribution(1, presaleTokenAddress)
      ).to.be.revertedWith("PerShare: phase 1 not finished");
    });

    it("refuse la double validation distribution", async function () {
      await perShare.connect(alice).validateDistribution(id, presaleTokenAddress);
      await expect(
        perShare.connect(alice).validateDistribution(id, presaleTokenAddress)
      ).to.be.revertedWith("PerShare: already validated dist");
    });

    it("refuse si pas de tokens recus", async function () {
      const deadline = (await time.latest()) + 86400;
      const nextId = await perShare.shareCount();
      await perShare.connect(alice).createShare("Share No Tokens", [alice.address, bob.address], usdtAddress, stranger.address, USDT(1000), deadline, 1);
      await approveAndContribute(alice, nextId, 1000);
      await perShare.connect(alice).validate(nextId);
      
      const FakeToken = await ethers.getContractFactory("MockPresaleToken");
      const fakeToken = await FakeToken.deploy();
      const fakeTokenAddress = await fakeToken.getAddress();
      
      await perShare.connect(alice).setExpectedToken(nextId, fakeTokenAddress);

      await expect(
        perShare.connect(alice).validateDistribution(nextId, fakeTokenAddress)
      ).to.be.revertedWith("PerShare: no tokens received");
    });

    it("emet TokensDistributed", async function () {
      await perShare.connect(alice).validateDistribution(id, presaleTokenAddress);
      await expect(
        perShare.connect(bob).validateDistribution(id, presaleTokenAddress)
      ).to.emit(perShare, "TokensDistributed")
        .withArgs(id, presaleTokenAddress, TOKENS(1000));
    });
  });

  // ─── 6. CAS D'USAGE — TRANSFERT CONDITIONNEL ─────────────────────────────

  describe("Cas d'usage : transfert conditionnel 2 membres", function () {
    it("Alice envoie a Bob — threshold 1 — Alice valide seule", async function () {
      const deadline = (await time.latest()) + 86400;

      await perShare.connect(alice).createShare(
        "Transfert Alice vers Bob",
        [alice.address, bob.address],
        usdtAddress,
        bob.address,
        USDT(500),
        deadline,
        1
      );

      const bobBefore = await usdt.balanceOf(bob.address);
      await approveAndContribute(alice, 0, 500);
      await perShare.connect(alice).validate(0);
      const bobAfter = await usdt.balanceOf(bob.address);

      expect(bobAfter - bobBefore).to.equal(USDT(495)); // 500 - 1%
    });
  });

  // ─── 7. CAS D'USAGE — ICO DIFFEREE ───────────────────────────────────────

  describe("Cas d'usage : ICO differee", function () {
    it("redistribue les tokens 30 jours apres l'envoi", async function () {
      const deadline = (await time.latest()) + 86400;
      await createBasicShare(stranger.address, deadline, 2);

      await approveAndContribute(alice,   0, 500);
      await approveAndContribute(bob,     0, 300);
      await approveAndContribute(charles, 0, 200);

      await perShare.connect(alice).validate(0);
      await perShare.connect(bob).validate(0);

      // 30 jours plus tard — le presale envoie les tokens
      await time.increase(30 * 24 * 3600);
      await presaleToken.sendToShare(perShareAddress, TOKENS(5000));

      await perShare.connect(alice).setExpectedToken(0, presaleTokenAddress);

      await perShare.connect(alice).validateDistribution(0, presaleTokenAddress);
      await perShare.connect(bob).validateDistribution(0, presaleTokenAddress);

      // Alice 50% / Bob 30% / Charles 20%
      expect(await presaleToken.balanceOf(alice.address)).to.equal(TOKENS(2500));
      expect(await presaleToken.balanceOf(bob.address)).to.equal(TOKENS(1500));
      expect(await presaleToken.balanceOf(charles.address)).to.equal(TOKENS(1000));
    });
  });

  // ─── 8. SECURITE ──────────────────────────────────────────────────────────

  describe("Securite", function () {

    it("refuse contribute apres envoi", async function () {
      const deadline = (await time.latest()) + 86400;
      await createBasicShare(stranger.address, deadline, 1);
      await approveAndContribute(alice, 0, 500);
      await approveAndContribute(bob,   0, 500);
      await perShare.connect(alice).validate(0);

      await usdt.connect(charles).approve(perShareAddress, USDT(100));
      await expect(
        perShare.connect(charles).contribute(0, USDT(100))
      ).to.be.revertedWith("PerShare: already sent");
    });

    it("refuse validate apres envoi", async function () {
      const deadline = (await time.latest()) + 86400;
      await createBasicShare(stranger.address, deadline, 1);
      await approveAndContribute(alice, 0, 500);
      await approveAndContribute(bob,   0, 500);
      await perShare.connect(alice).validate(0);

      await expect(
        perShare.connect(bob).validate(0)
      ).to.be.revertedWith("PerShare: already sent");
    });

    it("refuse refund apres envoi", async function () {
      const deadline = (await time.latest()) + 86400;
      await createBasicShare(stranger.address, deadline, 1);
      await approveAndContribute(alice, 0, 500);
      await approveAndContribute(bob,   0, 500);
      await perShare.connect(alice).validate(0);

      await time.increaseTo(deadline + 1);
      await expect(perShare.connect(alice).refund(0))
        .to.be.revertedWith("PerShare: already sent");
    });

    it("getProgress retourne le bon pourcentage", async function () {
      const deadline = (await time.latest()) + 86400;
      await createBasicShare(stranger.address, deadline, 2);
      await approveAndContribute(alice, 0, 400);
      await approveAndContribute(bob,   0, 200);

      const [collected, target, percent, reached] = await perShare.getProgress(0);
      expect(collected).to.equal(USDT(600));
      expect(target).to.equal(USDT(1000));
      expect(percent).to.equal(60n);
      expect(reached).to.be.false;
    });

    it("distribue la poussiere de tokens au premier membre", async function () {
      const deadline = (await time.latest()) + 86400;
      await perShare.connect(alice).createShare(
        "SHARE Dust", [alice.address, bob.address, charles.address], usdtAddress,
        stranger.address, USDT(1000), deadline, 1
      );
      // Contributions asymetriques qui vont creer de la poussiere
      // 333, 333, 334
      await approveAndContribute(alice, 0, 333);
      await approveAndContribute(bob,   0, 333);
      await approveAndContribute(charles, 0, 334);

      await perShare.connect(alice).validate(0);
      await perShare.connect(alice).setExpectedToken(0, presaleTokenAddress);

      // Presale envoie 1000 tokens
      await presaleToken.sendToShare(perShareAddress, TOKENS(1000));
      await perShare.connect(alice).validateDistribution(0, presaleTokenAddress);

      const aBal = await presaleToken.balanceOf(alice.address);
      const bBal = await presaleToken.balanceOf(bob.address);
      const cBal = await presaleToken.balanceOf(charles.address);

      // Check sum is exactly 1000
      expect(aBal + bBal + cBal).to.equal(TOKENS(1000));
    });

    it("peut etre mis en pause par le owner", async function () {
      const deadline = (await time.latest()) + 86400;
      await perShare.connect(alice).createShare("SHARE", [alice.address, bob.address], usdtAddress, stranger.address, USDT(1000), deadline, 1);
      
      await perShare.pause();
      
      await expect(
        perShare.connect(alice).validate(0)
      ).to.be.revertedWithCustomError(perShare, "EnforcedPause");
      
      await perShare.unpause();
      
      await approveAndContribute(alice, 0, 1000);
      await perShare.connect(alice).validate(0);
      const [, , , sent] = await perShare.getShareStatus(0);
      expect(sent).to.be.true;
    });

    it("peut changer les frais si owner et <= 2%", async function () {
      await perShare.setFeeBPS(200);
      expect(await perShare.feeBPS()).to.equal(200);
    });

    it("refuse le changement de frais si pas owner", async function () {
      await expect(perShare.connect(alice).setFeeBPS(2))
        .to.be.revertedWithCustomError(perShare, "OwnableUnauthorizedAccount");
    });

    it("refuse le changement de frais si > 2%", async function () {
      await expect(perShare.setFeeBPS(201))
        .to.be.revertedWith("PerShare: fee max 200 BPS");
    });

    it("preleve la nouvelle commission apres changement", async function () {
      await perShare.setFeeBPS(200);
      const deadline = (await time.latest()) + 86400;
      const nextId = await perShare.shareCount();
      await perShare.connect(alice).createShare("SHARE", [alice.address, bob.address], usdtAddress, stranger.address, USDT(1000), deadline, 1);
      
      const ownerBefore = await usdt.balanceOf(owner.address);
      await approveAndContribute(alice, nextId, 1000);
      await perShare.connect(alice).validate(nextId);
      const ownerAfter = await usdt.balanceOf(owner.address);
      
      expect(ownerAfter - ownerBefore).to.equal(USDT(20)); // 2% of 1000
    });
  });

// ─────────────────────────────────────────────────────────────────────────────
// 1. TESTS DE LA SÉCURITÉ PAUSABLE (KILL‑SWITCH)
// ─────────────────────────────────────────────────────────────────────────────

describe("🔒 Pausable — Kill-Switch", function () {
  let id, deadline;

  beforeEach(async function () {
    deadline = (await time.latest()) + 86400;
    await createBasicShare(stranger.address, deadline);
    id = await perShare.shareCount() - 1n; // Utiliser le vrai id
    await approveAndContribute(alice, id, 500);
  });

  it("bloque les contributions quand le contrat est en pause", async function () {
    await perShare.pause();
    await usdt.connect(bob).approve(perShareAddress, USDT(100));
    await expect(perShare.connect(bob).contribute(id, USDT(100)))
      .to.be.revertedWithCustomError(perShare, "EnforcedPause");
  });

  it("bloque la validation quand le contrat est en pause", async function () {
    await approveAndContribute(bob, id, 500);
    await perShare.pause();
    await expect(perShare.connect(alice).validate(id))
      .to.be.revertedWithCustomError(perShare, "EnforcedPause");
  });

  it("bloque le remboursement quand le contrat est en pause", async function () {
    await time.increaseTo(deadline + 1);
    await perShare.pause();
    await expect(perShare.connect(alice).refund(id))
      .to.be.revertedWithCustomError(perShare, "EnforcedPause");
  });

  it("permet de reprendre les opérations après unpause", async function () {
    await perShare.pause();
    await perShare.unpause();
    await approveAndContribute(bob, id, 500);
    const [collected] = await perShare.getProgress(id);
    expect(collected).to.equal(USDT(1000));
  });

  it("seul le owner peut mettre en pause", async function () {
    await expect(perShare.connect(alice).pause())
      .to.be.revertedWithCustomError(perShare, "OwnableUnauthorizedAccount");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. TESTS DE LA COMMISSION (feePercent)
// ─────────────────────────────────────────────────────────────────────────────

describe("💰 Commission et frais", function () {
  let id, deadline;

  beforeEach(async function () {
    deadline = (await time.latest()) + 86400;
    await createBasicShare(stranger.address, deadline);
    id = await perShare.shareCount() - 1n;
    await approveAndContribute(alice, id, 400);
    await approveAndContribute(bob, id, 400);
    await approveAndContribute(charles, id, 200);
  });

  it("le owner peut modifier le taux de commission (max 2%)", async function () {
    await perShare.setFeeBPS(200);
    expect(await perShare.feeBPS()).to.equal(200);
  });

  it("le owner peut modifier l'adresse du feeRecipient", async function () {
    await perShare.setFeeRecipient(alice.address);
    expect(await perShare.feeRecipient()).to.equal(alice.address);
  });

  it("refuse une adresse invalide pour feeRecipient", async function () {
    await expect(perShare.setFeeRecipient(ethers.ZeroAddress))
      .to.be.revertedWith("PerShare: invalid address");
  });

  it("refuse un taux de commission > 2%", async function () {
    await expect(perShare.setFeeBPS(201))
      .to.be.revertedWith("PerShare: fee max 200 BPS");
  });

  it("la commission est prélevée sur le montant total, pas sur le net", async function () {
    const total = USDT(1000);
    // fee = 1% = 100 BPS
    const fee = (total * 100n) / 10000n;
    const net = total - fee;

    const destBefore = await usdt.balanceOf(stranger.address);
    const ownerBefore = await usdt.balanceOf(owner.address);

    await perShare.connect(alice).validate(id);
    await perShare.connect(bob).validate(id);

    expect(await usdt.balanceOf(stranger.address) - destBefore).to.equal(net);
    expect(await usdt.balanceOf(owner.address) - ownerBefore).to.equal(fee);
  });

  it("si la commission est à 0%, tout part à la destination", async function () {
    await perShare.setFeeBPS(0);
    const destBefore = await usdt.balanceOf(stranger.address);
    await perShare.connect(alice).validate(id);
    await perShare.connect(bob).validate(id);
    expect(await usdt.balanceOf(stranger.address) - destBefore).to.equal(USDT(1000));
  });

  it("reduit les frais a 0% si le createur possede assez de tokens de plateforme", async function () {
    // Deploy a mock token to act as the platform token
    const MockToken = await ethers.getContractFactory("MockUSDT"); // We can use MockUSDT as a generic ERC20
    const platformToken = await MockToken.deploy();
    const tokenAddr = await platformToken.getAddress();

    await perShare.setPlatformToken(tokenAddr);
    
    // threshold is 10000 * 10**18 by default
    // Give Alice (the creator of the share) enough tokens
    await platformToken.faucet(alice.address, ethers.parseEther("15000"));

    const destBefore = await usdt.balanceOf(stranger.address);
    const ownerBefore = await usdt.balanceOf(owner.address);

    await perShare.connect(alice).validate(id);
    await perShare.connect(bob).validate(id);

    // Everything should go to the destination (100% of 1000 = 1000)
    expect(await usdt.balanceOf(stranger.address) - destBefore).to.equal(USDT(1000));
    // Owner gets 0
    expect(await usdt.balanceOf(owner.address) - ownerBefore).to.equal(0n);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. TESTS AVANCÉS PHASE 2 (EXPECTEDTOKEN + REDISTRIBUTION AVEC DUST)
// ─────────────────────────────────────────────────────────────────────────────

describe("🚀 Phase 2 — expectedToken et redistribution avec dust", function () {
  let id, deadline;

  beforeEach(async function () {
    deadline = (await time.latest()) + 86400;
    await perShare.connect(alice).createShare(
      "Presale XYZ",
      [alice.address, bob.address, charles.address],
      usdtAddress,
      stranger.address,
      USDT(1000),
      deadline,
      2
    );
    id = await perShare.shareCount() - 1n;

    await approveAndContribute(alice, id, 400);
    await approveAndContribute(bob, id, 350);
    await approveAndContribute(charles, id, 200);
  });

  it("setExpectedToken ne peut être appelé que par le créateur", async function () {
    await expect(perShare.connect(bob).setExpectedToken(id, presaleTokenAddress))
      .to.be.revertedWith("PerShare: not the creator");
  });

  it("setExpectedToken échoue si la Phase 1 n'est pas terminée", async function () {
    await expect(perShare.connect(alice).setExpectedToken(id, presaleTokenAddress))
      .to.be.revertedWith("PerShare: phase 1 not finished");
  });

  it("setExpectedToken réussit après la Phase 1", async function () {
    await approveAndContribute(charles, id, 50);
    await perShare.connect(alice).validate(id);
    await perShare.connect(bob).validate(id);
    await perShare.connect(alice).setExpectedToken(id, presaleTokenAddress);
    const share = await perShare.getShareStatus(id);
    expect(share.expectedToken).to.equal(presaleTokenAddress);
  });

  it("refuse une mauvaise tentative de token dans validateDistribution", async function () {
    await approveAndContribute(charles, id, 50);
    await perShare.connect(alice).validate(id);
    await perShare.connect(bob).validate(id);
    await perShare.connect(alice).setExpectedToken(id, presaleTokenAddress);

    const FakeToken = await ethers.getContractFactory("MockPresaleToken");
    const fakeToken = await FakeToken.deploy();
    await fakeToken.sendToShare(perShareAddress, TOKENS(1000));

    await expect(
      perShare.connect(alice).validateDistribution(id, await fakeToken.getAddress())
    ).to.be.revertedWith("PerShare: wrong token");
  });

  it("redistribue correctement avec gestion du dust (reste au premier contributeur)", async function () {
    await approveAndContribute(charles, id, 50);
    await perShare.connect(alice).validate(id);
    await perShare.connect(bob).validate(id);
    await perShare.connect(alice).setExpectedToken(id, presaleTokenAddress);

    // Total contrib = 400 + 350 + 250 = 1000
    // To create dust, totalTokens must not be perfectly divisible
    const totalTokens = TOKENS(333);
    const totalContrib = USDT(1000);

    // Provide the 333 tokens to the share
    await presaleToken.sendToShare(perShareAddress, totalTokens);

    const aliceBefore = await presaleToken.balanceOf(alice.address);
    const bobBefore = await presaleToken.balanceOf(bob.address);
    const charlesBefore = await presaleToken.balanceOf(charles.address);

    await perShare.connect(alice).validateDistribution(id, presaleTokenAddress);
    await perShare.connect(bob).validateDistribution(id, presaleTokenAddress);

    const aliceAfter = await presaleToken.balanceOf(alice.address);
    const bobAfter = await presaleToken.balanceOf(bob.address);
    const charlesAfter = await presaleToken.balanceOf(charles.address);

    const aliceRaw = (totalTokens * USDT(400)) / totalContrib;
    const bobRaw   = (totalTokens * USDT(350)) / totalContrib;
    const charlesRaw = (totalTokens * USDT(250)) / totalContrib;

    const distributed = aliceRaw + bobRaw + charlesRaw;
    const dust = totalTokens - distributed;

    const aliceExpected = aliceRaw + dust;

    expect(aliceAfter - aliceBefore).to.equal(aliceExpected);
    expect(bobAfter - bobBefore).to.equal(bobRaw);
    expect(charlesAfter - charlesBefore).to.equal(charlesRaw);
  });

  it("refuse de redistribuer si le token attendu n'a pas été défini", async function () {
    await approveAndContribute(charles, id, 50);
    await perShare.connect(alice).validate(id);
    await perShare.connect(bob).validate(id);

    await presaleToken.sendToShare(perShareAddress, TOKENS(1000));
    await expect(
      perShare.connect(alice).validateDistribution(id, presaleTokenAddress)
    ).to.be.revertedWith("PerShare: expected token not set");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. TESTS AVANCÉS DE LA FONCTION REFUND
// ─────────────────────────────────────────────────────────────────────────────

describe("↩️ Refund — remboursement avancé", function () {
  let id, deadline;

  beforeEach(async function () {
    deadline = (await time.latest()) + 86400;
    await createBasicShare(stranger.address, deadline);
    id = await perShare.shareCount() - 1n;
    await approveAndContribute(alice, id, 500);
    await approveAndContribute(bob, id, 300);
  });

  it("refuse le remboursement si la deadline n'est pas passée", async function () {
    await expect(perShare.connect(alice).refund(id))
      .to.be.revertedWith("PerShare: deadline not passed yet");
  });

  it("rembourse exactement chaque membre (sans commission)", async function () {
    await time.increaseTo(deadline + 1);
    const aliceBefore = await usdt.balanceOf(alice.address);
    const bobBefore = await usdt.balanceOf(bob.address);

    await perShare.connect(alice).refund(id);

    expect(await usdt.balanceOf(alice.address) - aliceBefore).to.equal(USDT(500));
    expect(await usdt.balanceOf(bob.address) - bobBefore).to.equal(USDT(300));
  });

  it("refuse un second remboursement", async function () {
    await time.increaseTo(deadline + 1);
    await perShare.connect(alice).refund(id);
    await expect(perShare.connect(alice).refund(id))
      .to.be.revertedWith("PerShare: already refunded");
  });

  it("refuse le remboursement si le SHARE a déjà été envoyé", async function () {
    await approveAndContribute(charles, id, 200);
    await perShare.connect(alice).validate(id);
    await perShare.connect(bob).validate(id);

    await time.increaseTo(deadline + 1);
    await expect(perShare.connect(alice).refund(id))
      .to.be.revertedWith("PerShare: already sent");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. TESTS DE RÉSISTANCE (LIMITES ET ATTAQUES)
// ─────────────────────────────────────────────────────────────────────────────

describe("🛡️ Sécurité avancée et limites", function () {
  let id, deadline;

  beforeEach(async function () {
    deadline = (await time.latest()) + 86400;
    await createBasicShare(stranger.address, deadline);
    id = await perShare.shareCount() - 1n;
  });

  it("peut contribuer plus que l'objectif (comportement volontaire)", async function () {
    await approveAndContribute(alice, id, 1000);
    await approveAndContribute(bob, id, 1000);
    const [collected] = await perShare.getProgress(id);
    expect(collected).to.equal(USDT(2000));
  });

  it("ne valide pas si le threshold n'est pas atteint", async function () {
    await approveAndContribute(alice, id, 500);
    await approveAndContribute(bob, id, 500);
    await perShare.connect(alice).validate(id);
    const share = await perShare.getShareStatus(id);
    expect(share.sent).to.be.false;
  });

  it("limite à 50 membres maximum", async function () {
    const members = [];
    for (let i = 0; i < 51; i++) {
      members.push(ethers.Wallet.createRandom().address);
    }
    await expect(
      perShare.connect(alice).createShare(
        "Test 51 membres",
        members,
        usdtAddress,
        stranger.address,
        USDT(1000),
        deadline,
        1
      )
    ).to.be.revertedWith("PerShare: max 50 members");
  });
});

});
