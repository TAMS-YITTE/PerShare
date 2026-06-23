const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("Generating flattened source natively...");
  const flattened = await hre.run("flatten:get-flattened-sources");
  
  // Clean up any double SPDX licenses if present, though BscScan usually accepts it.
  // We just write it directly to a file as pure UTF-8 string.
  fs.writeFileSync("PerShareV1_flattened_clean.sol", flattened, "utf8");
  console.log("Saved to PerShareV1_flattened_clean.sol");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
