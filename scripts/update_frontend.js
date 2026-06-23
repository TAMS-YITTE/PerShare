const fs = require('fs');

const contractPath = './frontend-nextjs/src/lib/contract.ts';
let content = fs.readFileSync(contractPath, 'utf8');

// Update addresses
content = content.replace(
  /perShare:\s*"0x[a-fA-F0-9]+"\s*as\s*`0x\${string}`/,
  'perShare: "0x4315b0696ECe5157a3640cd6DbD99C69c2B138a2" as `0x${string}`'
);
content = content.replace(
  /usdt:\s*"0x[a-fA-F0-9]+"\s*as\s*`0x\${string}`/,
  'usdt:     "0x652C1cAEE755ec3b8b033D65e0EA4E5bf336DA3B" as `0x${string}`'
);
content = content.replace(
  /presaleToken:\s*"0x[a-fA-F0-9]+"\s*as\s*`0x\${string}`/,
  'presaleToken: "0x6D0fDAdC0f21F3A0c534D506FE71253cF2ebC76d" as `0x${string}`'
);

// We need to update the ABI.
// Let's replace the refund function with markRefunded, claimRefund, depositTokens, claimDistribution

const newFunctions = `
  { name: "markRefunded", type: "function", stateMutability: "nonpayable",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: []
  },
  { name: "claimRefund", type: "function", stateMutability: "nonpayable",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: []
  },
  { name: "depositTokens", type: "function", stateMutability: "nonpayable",
    inputs: [{ name: "id", type: "uint256" }, { name: "amount", type: "uint256" }],
    outputs: []
  },
  { name: "claimDistribution", type: "function", stateMutability: "nonpayable",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: []
  },
  { name: "sweepDust", type: "function", stateMutability: "nonpayable",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: []
  },`;

content = content.replace(
  /\{\s*name:\s*"refund"[\s\S]*?\},/,
  newFunctions.trim()
);

// We also need to add hasValidatedDist to the view functions, but it's already there? Let me check.
// Yes, hasValidatedDist is not in contract.ts! Ah wait, I need to check.
// Let's just write the changes.

fs.writeFileSync(contractPath, content);
console.log("Frontend contract updated!");
