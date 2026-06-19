// PerShare V1 — Contract ABI + Addresses
// Mettre a jour ADDRESSES apres deploiement testnet / mainnet

export const PERSHARE_ABI = [
  { name: "createShare", type: "function", stateMutability: "nonpayable",
    inputs: [
      { name: "name", type: "string" },
      { name: "members", type: "address[]" },
      { name: "stablecoin", type: "address" },
      { name: "destination", type: "address" },
      { name: "targetAmount", type: "uint256" },
      { name: "deadline", type: "uint256" },
      { name: "threshold", type: "uint256" }
    ],
    outputs: [{ name: "id", type: "uint256" }]
  },
  { name: "contribute", type: "function", stateMutability: "nonpayable",
    inputs: [{ name: "id", type: "uint256" }, { name: "amount", type: "uint256" }],
    outputs: []
  },
  { name: "validate", type: "function", stateMutability: "nonpayable",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: []
  },
  { name: "validateDistribution", type: "function", stateMutability: "nonpayable",
    inputs: [{ name: "id", type: "uint256" }, { name: "tokenAddress", type: "address" }],
    outputs: []
  },
  { name: "setExpectedToken", type: "function", stateMutability: "nonpayable",
    inputs: [{ name: "id", type: "uint256" }, { name: "tokenAddress", type: "address" }],
    outputs: []
  },
  { name: "refund", type: "function", stateMutability: "nonpayable",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: []
  },
  { name: "getShareDetails", type: "function", stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [
      { name: "name", type: "string" },
      { name: "creator", type: "address" },
      { name: "stablecoin", type: "address" },
      { name: "destination", type: "address" },
      { name: "targetAmount", type: "uint256" },
      { name: "deadline", type: "uint256" },
      { name: "threshold", type: "uint256" }
    ]
  },
  { name: "getShareStatus", type: "function", stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [
      { name: "totalReceived", type: "uint256" },
      { name: "currentValidations", type: "uint256" },
      { name: "currentDistValidations", type: "uint256" },
      { name: "sent", type: "bool" },
      { name: "refunded", type: "bool" },
      { name: "tokensDistributed", type: "bool" },
      { name: "expectedToken", type: "address" }
    ]
  },
  { name: "getShareMembers", type: "function", stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [{ type: "address[]" }]
  },
  { name: "getProgress", type: "function", stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [
      { name: "collected", type: "uint256" },
      { name: "target", type: "uint256" },
      { name: "percent", type: "uint256" },
      { name: "targetReached", type: "bool" }
    ]
  },
  { name: "getContribution", type: "function", stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }, { name: "member", type: "address" }],
    outputs: [{ type: "uint256" }]
  },
  { name: "hasValidated", type: "function", stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }, { name: "member", type: "address" }],
    outputs: [{ type: "bool" }]
  },
  { name: "shareCount", type: "function", stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }]
  }
] as const;

export const ERC20_ABI = [
  { name: "approve", type: "function", stateMutability: "nonpayable",
    inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }],
    outputs: [{ type: "bool" }]
  },
  { name: "allowance", type: "function", stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }],
    outputs: [{ type: "uint256" }]
  },
  { name: "balanceOf", type: "function", stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint256" }]
  }
] as const;

// ── Adresses — remplir apres deploiement ─────────────────────────────────────

export const ADDRESSES = {
  bscTestnet: {
    perShare: "0xdeA0c7Ecbe2d6fCF732ebEbbE2c383A1FEe1E023" as `0x${string}`,
    usdt:     "0x33DBE4D8D4BCc21DC0EB25F97234F91cD0a32D17" as `0x${string}`,
    presaleToken: "0x53cd2Bc7F6ab3D6B1F28150d43393e8032928596" as `0x${string}`,
  },
  bsc: {
    perShare: "" as `0x${string}`,
    usdt:     "0x55d398326f99059fF775485246999027B3197955" as `0x${string}`,
    usdc:     "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d" as `0x${string}`,
  }
};
