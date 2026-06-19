// Script de deploiement PerShare V1
// Usage : npx hardhat run scripts/deploy.js --network bscTestnet

const { ethers, network } = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log("─────────────────────────────────────────");
  console.log("PERSHARE V1 — Deploiement");
  console.log("─────────────────────────────────────────");
  console.log("Network    :", network.name);
  console.log("Deployer   :", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Balance    :", ethers.formatEther(balance), "BNB");
  console.log("");

  // ── Testnet — deployer les mocks ─────────────────────────────────────────

  let usdtAddress;
  let presaleTokenAddress;

  if (network.name === "bscTestnet" || network.name === "hardhat") {

    console.log("1. Deploiement MockUSDT...");
    const MockUSDT = await ethers.getContractFactory("MockUSDT");
    const mockUSDT = await MockUSDT.deploy();
    await mockUSDT.waitForDeployment();
    usdtAddress = await mockUSDT.getAddress();
    console.log("   MockUSDT          :", usdtAddress);

    console.log("2. Deploiement MockPresaleToken...");
    const MockPresaleToken = await ethers.getContractFactory("MockPresaleToken");
    const mockPresaleToken = await MockPresaleToken.deploy();
    await mockPresaleToken.waitForDeployment();
    presaleTokenAddress = await mockPresaleToken.getAddress();
    console.log("   MockPresaleToken  :", presaleTokenAddress);

  } else {

    // Mainnet BNB Chain — utiliser les vrais stablecoins
    usdtAddress = "0x55d398326f99059fF775485246999027B3197955"; // USDT BNB Mainnet
    console.log("1. USDT Mainnet      :", usdtAddress);
    console.log("2. Pas de mock sur mainnet");
  }

  // ── Deployer PerShare ─────────────────────────────────────────────────────

  console.log("3. Deploiement PerShare...");
  const PerShare = await ethers.getContractFactory("PerShare");
  const perShare = await PerShare.deploy(deployer.address);
  await perShare.waitForDeployment();
  const perShareAddress = await perShare.getAddress();
  console.log("   PerShare           :", perShareAddress);

  // ── Verification ──────────────────────────────────────────────────────────

  const deployedOwner = await perShare.owner();
  const maxMembers    = await perShare.MAX_MEMBERS();
  const commission    = await perShare.feeBPS();

  console.log("");
  console.log("─────────────────────────────────────────");
  console.log("DEPLOIEMENT TERMINE");
  console.log("─────────────────────────────────────────");
  console.log("PerShare address  :", perShareAddress);
  console.log("Owner             :", deployedOwner);
  console.log("Max membres       :", maxMembers.toString());
  console.log("Commission        :", commission.toString(), "bps");
  console.log("");

  if (network.name === "bscTestnet") {
    console.log("BscScan Testnet   :");
    console.log("https://testnet.bscscan.com/address/" + perShareAddress);
  } else if (network.name === "bscMainnet") {
    console.log("BscScan Mainnet   :");
    console.log("https://bscscan.com/address/" + perShareAddress);
  }

  console.log("");
  console.log("Prochaines etapes :");
  console.log("1. Copier les adresses dans .env");
  if (network.name !== "bscMainnet") {
    console.log("2. Lancer les tests  : npx hardhat test");
    console.log("3. Verifier contrat  : npx hardhat verify --network bscTestnet", perShareAddress);
  } else {
    console.log("2. Verifier contrat  : npx hardhat verify --network bscMainnet", perShareAddress);
    console.log("3. Publier l'adresse sur le site pershare.io");
  }
  console.log("─────────────────────────────────────────");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
