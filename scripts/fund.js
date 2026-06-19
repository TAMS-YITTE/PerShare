const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const targetAddress = "0x5dfd28C204AADbbda65Fa57aD54a9f826c08D415";
  const usdtAddress = "0x33DBE4D8D4BCc21DC0EB25F97234F91cD0a32D17";

  console.log("Funding Account 8:", targetAddress);

  // 1. Envoyer 0.05 tBNB
  console.log("Envoi de 0.05 tBNB...");
  const tx1 = await deployer.sendTransaction({
    to: targetAddress,
    value: ethers.parseEther("0.05")
  });
  await tx1.wait();
  console.log("tBNB envoye !");

  // 2. Envoyer 100 000 USDT via faucet
  console.log("Mint de 100 000 USDT...");
  const usdt = await ethers.getContractAt("MockUSDT", usdtAddress);
  const tx2 = await usdt.faucet(targetAddress, ethers.parseEther("100000"));
  await tx2.wait();
  console.log("USDT mintes !");
}

main().catch(console.error);
