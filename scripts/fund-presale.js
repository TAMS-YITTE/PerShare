const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const presaleTokenAddress = "0x53cd2Bc7F6ab3D6B1F28150d43393e8032928596";
  const perShareContractAddress = "0xdeA0c7Ecbe2d6fCF732ebEbbE2c383A1FEe1E023";

  console.log("Airdrop de faux tokens de Presale vers le contrat PerShare...");
  
  // Utiliser l'ABI de l'ERC20 standard avec la methode sendToShare specifique au MockPresaleToken
  const abi = [
    "function sendToShare(address perShareContract, uint256 amount) external"
  ];
  const token = new ethers.Contract(presaleTokenAddress, abi, deployer);
  
  const tx = await token.sendToShare(perShareContractAddress, ethers.parseEther("5000000"));
  await tx.wait();
  
  console.log("Succes ! 5 000 000 de tokens MPT ont ete livres au contrat PerShare.");
}

main().catch(console.error);
