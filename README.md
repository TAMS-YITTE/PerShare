# PerShare — SHARE

> Each member receives their share. Automatically. Onchain.

## Project Structure

```
contracts/
  PerShareV1.sol          Main contract — 7 functions
  MockUSDT.sol            Test USDT (BNB Testnet only)
  MockPresaleToken.sol    Test presale token (Phase 2)

scripts/
  deploy.js               BNB Testnet + Mainnet deployment

test/
  PerShare.test.js        70 comprehensive unit tests

frontend-nextjs/
  src/app/                Next.js Pages (Dashboard + Share Details)
  src/hooks/useShare.ts   Wagmi hooks for the contract
  src/components/         UI Components (ShareCard, CreateShareModal)
  src/lib/contract.ts     ABI + addresses

docs/
  PerShare_Whitepaper_V1.docx   Full Whitepaper
  PerShare_Deck_V1.pptx         12-slide Pitch Deck
  PerShare_Specs_V1.docx        Technical Specifications
```

## Main Features (Secured)

- **Phase 1 (Collection) & Phase 2 (Redistribution)**
- **Anti-Dust Security**: Token dust due to asymmetric division rounding is transferred to the first member.
- **Anti-Collision Security**: `expectedToken` ensures no malicious token can trigger the Phase 2 validation.
- **Dynamic & Secure Fees**: Default commission of 1% (maximum 5%), sent to a distinct `feeRecipient` address for added security.
- **Tokenomics (Dormant)**: Pre-integration of the future `$SHARE` platform token, which will exempt creators holding a certain threshold from fees (0%).
- **Public Refund (Permissionless)**: In case of failure (deadline passed), anyone can trigger the `refund` to unlock inactive members' funds.
- **Kill-Switch (Pausable & Ownable)**: Allows temporary transaction blocking if a vulnerability is detected.

## V1 Compatibility — Grouped by Affinity

**🔒 Secure a transaction (escrow / holding)**
- **Beat Fiverr/Upwork** ✅ Client/freelance escrow, threshold 2. Available now.
- **Instant P2P Escrow** ✅ Buyer deposits, seller ships, cross-validation. Available now.

**🚀 Invest together (presale / group buy)**
- **Buy together** ✅ The pool collects USDT and sends it to the presale. Works out of the box if the presale returns tokens automatically (Push mode).
- **Institutional buying syndicate** ✅ Grouped pool, single ticket to the seller. Available now (Push).

  *Built-in safety net: as long as the pool hasn't validated, the money remains locked in the contract. Any doubts before the deadline? Don't validate, and each member is refunded 100% at the deadline.*

> [!WARNING]
> ## Presales in Claim mode
> Push (tokens returned automatically) = **good case**, everything works in V1.
> **Claim** mode (active purchase required) → use a **personal wallet as destination**. Full automation coming in **V2 Factory pattern**.
>
> The safety net only protects **before** sending. Once the funds are sent to the presale, the presale has control.

**👥 Pool money (money pool / tontine)**
- **Joint account without a bank** ✅ Multi-member pool, collective validation. Available now.
- **Trustless crypto tontine** ✅ Collective pool among crypto members, code holds the money. Available now (USDT version between wallets).

**💰 Distribute gains (proportional distribution)**
- **Dispute-free revenue sharing** ✅ For one-off revenues. Native proportional distribution.
- **Hackathon prize pool** ✅ Team + shares, auto distribution. Available now.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill environment variables
cp .env.example .env

# 3. Compile the contract (viaIR active to optimize EVM stack)
npx hardhat compile

# 4. Run tests
npx hardhat test

# 5. Deploy on BNB Testnet
npx hardhat run scripts/deploy.js --network bscTestnet

# 6. Start the frontend
cd frontend-nextjs
npm install
npm run dev
```

## BNB Mainnet Addresses

| Token | Address |
|---|---|
| USDT | 0x55d398326f99059fF775485246999027B3197955 |
| USDC | 0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d |

## Before Mainnet

- [x] `npx hardhat compile` — zero errors
- [x] `npx hardhat test` — 70 green tests (100% success rate)
- [x] UI & Frontend Next.js integration
- [x] Fully translated to English
- [ ] BNB Testnet Deployment
- [ ] Manual testing with real wallets
- [ ] Security Audit (Certik / Hacken / PeckShield)
- [ ] Audit report published on BscScan
- [ ] BNB Mainnet Deployment

## Contact

pershare.io
