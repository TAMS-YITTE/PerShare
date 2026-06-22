const fs = require('fs');
const artifact = require('../artifacts/contracts/PerShareV1.sol/PerShare.json');

const bytecode = artifact.deployedBytecode;
// Bytecode is a hex string starting with '0x', so we remove 2 characters and divide by 2
const sizeInBytes = (bytecode.length - 2) / 2;
const sizeInKb = sizeInBytes / 1024;

console.log(`PerShare Contract Size: ${sizeInKb.toFixed(3)} KB`);
if (sizeInKb > 24.576) {
    console.error("❌ ERROR: Contract size exceeds 24.576 KB Mainnet limit!");
    process.exit(1);
} else {
    console.log("✅ SUCCESS: Contract size is within Mainnet limits!");
}
