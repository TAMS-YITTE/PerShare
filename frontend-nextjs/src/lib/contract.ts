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
  { name: "hasValidatedDist", type: "function", stateMutability: "view",
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

// BSC Mainnet — 3 contract instances by fee tier
export const PERSHARE_CONTRACTS = {
  social:   "0x646D044703a80E424E20fe78d10ED624383Fa303" as `0x${string}`, // 0.5%
  standard: "0x35B4BAf4Af02151A76e4e00eA3411EDe495f463a" as `0x${string}`, // 1%
  premium:  "0xCA962143652fC02476501f5d32901E5aaaC9F1aD" as `0x${string}`, // 2%
} as const;

export type PerShareTier = keyof typeof PERSHARE_CONTRACTS;

export const ADDRESSES = {
  bscTestnet: {
    perShare: "0x4315b0696ECe5157a3640cd6DbD99C69c2B138a2" as `0x${string}`,
    usdt:     "0x652C1cAEE755ec3b8b033D65e0EA4E5bf336DA3B" as `0x${string}`,
    presaleToken: "0x6D0fDAdC0f21F3A0c534D506FE71253cF2ebC76d" as `0x${string}`,
  },
  bsc: {
    perShare: PERSHARE_CONTRACTS.standard, // default: Standard 1%
    usdt:     "0x55d398326f99059fF775485246999027B3197955" as `0x${string}`,
    usdc:     "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d" as `0x${string}`,
  }
};
