# PerShare — Use Cases, Maturity & Roadmap
> Consolidated document — fusion of three analyses
> Version: 1.2 — June 2025

---

## Legend

| Icon | Meaning |
|:---:|:---|
| ✅ | Available V1 — no code changes required |
| 🟡 | Partial V1 — contract OK, frontend or integration to complete |
| 🔜 | V2 — requires additional features in the contract |
| 🚧 | V3+ — requires major external integrations or out of scope |
| ⭐ | Priority marketing hook at launch |
| ⚠️ | Regulatory or technical watchpoint |

---

## Category 1 — Immediately Monetizable (V1) ✅

Use cases based on the core V1 contract. No code changes required.

| # | Use Case | Audience | Market Size | Missing Elements | Risk |
|:---|:---|:---|:---|:---|:---|
| **1** | **Private Presale / ICO (Syndicate) ⭐** | BNB Chain traders, crypto degens | High — dozens of presales daily on BSC | ✅ None. Phase 1 + Phase 2 + Dust are complete. ⚠️ The creator must call `setExpectedToken()` before receiving tokens. Missing: Partner presales listing page on the frontend. *See Presale Workflows below.* | Low |
| **2** | **Token Sale via PerShare ⭐** | Crypto founders, project creators | High — PerShare IS the presale contract | ✅ None. Missing: Dedicated "Launch your presale" page in the frontend + creation guide. This is the meta-use case — PerShare finances PerShare. | Low |
| **3** | **Web3 Escrow / B2B Payment** | Freelancers, DAOs, crypto clients | Very High — alternative to Upwork (20% fee) | ✅ None. Threshold = 2 between client and freelancer. Missing: "Escrow" mode in the UI with mission / delivery / validation workflow. | Low |
| **4** | **Personal Multisig Vault** | Cautious holders, founding teams | Medium — security niche | ✅ None. Custom threshold on own wallets. Missing: "Secure Savings" mode in the UI + clear explanation. | Low |
| **5** | **Security Deposit / Escrow** | Individuals, crypto real estate agencies | Medium — rental deposits, equipment | ✅ None. Automatic refund at deadline if no validation. ⚠️ The landlord must have a wallet — high friction for non-crypto. Reduced in V1.5 with fiat on-ramp. | Low |
| **6** | **Informal DAO Treasury / Simple Grants** | Web3 communities, collectives | Medium — alternative to complex Gnosis Safes | ✅ None. Configurable majority (e.g. 3/5). Missing: Discord/Telegram bot integration to notify members. | Low |
| **7** | **Secure P2P Payment (Web3 Classifieds)** | Crypto public, buyers/sellers | High — massive C2C market | ✅ None. Buyer deposits, seller ships, cross-validation releases. Missing: "P2P Buy/Sell" mode in the UI + onchain seller reputation in V2. | Low |
| **8** | **Hackathon Prize — Team distribution** | Builders, developers, teams | Medium — targeted but loyal community | ✅ None. Shared pool among winning team members. Missing: ETHGlobal, DoraHacks, Gitcoin partnerships for official referencing. | Low |
| **9** | **Collective Money Pool** | General public | Very High — alternative to GoFundMe (fees) | ✅ None. Missing: Fiat on-ramp (Transak) for non-crypto users + public shareable page on social media. | Low |

---

### Presale Workflows for Use Case #1 ⭐

When performing a Presale / ICO group buy, the Destination address handling defines the workflow:

1. **Automatic Presale Push ⭐**
   * **Destination** = Presale contract
   * → PerShare sends the USDT.
   * → The presale automatically sends the tokens back.
   * → *Works ONLY IF the presale does a return `transfer()` upon receiving funds.*
2. **Request a Push from the Seller ⭐**
   * **Destination** = Seller's address
   * "Send the tokens to our contract address"
   * → The seller does a manual `transfer()`.
   * → *Trivial for them, zero risk for you.*
3. **Personal EOA Wallet as Destination**
   * **Destination** = Your wallet
   * → You receive the USDT.
   * → You buy/claim the presale tokens yourself.
   * → You send the tokens back to PerShare manually.

---

## Category 2 — Usable in V1, Optimal with V1.5 Frontend 🟡

Contract is functional, but interface friction, integration, or a technical limit restricts adoption.

| # | Use Case | Audience | Market Size | Missing Elements (Frontend V1.5) | Risk |
|:---|:---|:---|:---|:---|:---|
| **10** | **Digital Tontine (Simple ROSCA) ⭐** | Africa, Asia, diasporas | Massive — 600M+ global practitioners | 🟡 Contract OK for non-rotating version. Missing: Mobile Money guide (Binance P2P, Yellow Card) integrated in UI + frontend in French/Swahili/Wolof + tontine community partnerships. | Low |
| **11** | **Community Private Launchpad** | Token creators, communities | High — alternative to PinkSale with more control | 🟡 Contract OK. Missing: Dedicated creator interface to streamline member creation and Phase 2 sending + manual vesting management. | Low |
| **12** | **Roommate Expenses** | Students, young professionals | High — universal daily problem | 🟡 Contract OK. Missing: Recurring SHARE (automatic monthly recreation) in V2 + fiat on-ramp for non-crypto + ultra-simplified interface. | Low |
| **13** | **Semi-Secure OTC (USDT Escrow)** | Whales, large traders | Medium — large unit volumes | 🟡 Buyer locks USDT in the SHARE. Seller manually sends tokens. If the seller doesn't deliver, the buyer can trigger a refund after the deadline. ⚠️ Not an atomic swap — the contract doesn't secure the seller's token. Useful while waiting for case #27 (V3+). | Medium |
| **14** | **Multisig Supplier Payment** | Crypto startups, teams | Medium | 🟡 Contract OK. Missing: "Team Treasury" mode in the UI + transaction history per team + accounting CSV export. | Low |
| **15** | **Creator Revenue Share (One-off collab)** | YouTubers, artists, influencers | High — exploding creator economy | 🟡 Contract OK for one-off revenues. Missing: Internal USDT distribution in V2 for recurring revenues + platform integration. | Low |

---

## Category 3 — Roadmap V2 (Contract Evolution) 🔜

Requires additional features in the smart contract.

| # | Use Case | Audience | Missing Elements (Contract V2) | Risk |
|:---|:---|:---|:---|:---|
| **16** | **Public Crowdfunding / ICOs** | General public, project founders | 🔜 Heavy architecture: replacing the `members` array with an open registration system (dynamic mapping, public validation, anti-spam). ⚠️ High regulatory risk — public fundraising potentially subject to SEC/MiCA. Legal counsel mandatory before deployment. | High ⚠️ |
| **17** | **ROSCA Tontine with Auto-Rotation** | Structured tontine communities | 🔜 Rotating beneficiary index + automatic share reset + cyclic time-lock + Chainlink Automation for monthly rotation without human intervention. | Medium |
| **18** | **Co-founder Vesting** | Startups, founding teams | 🔜 Vesting logic (progressive unlocking by tranches) + cliff period + revocation upon departure + internal USDT distribution. | Low |
| **19** | **Affiliate Commission** | Sales, affiliates | 🔜 Internal USDT distribution + recurring SHARE + triggered by external event (webhook when sale confirmed). | Low |
| **20** | **Collective Subscription (Netflix, SaaS)** | Friends, colleagues | 🔜 Monthly recurring SHARE + fiat on-ramp + off-ramp to subscribed service. ⚠️ Service must accept crypto or requires fiat intermediary. | Medium |
| **21** | **NFT Group Buy** | Collectors, NFT degens | 🔜 ERC-721/1155 support: implement `onERC721Received` and `onERC1155Received` + sell function with member voting + integrated resale governance. | Medium |
| **22** | **Multi-round Grant Management** | DAOs, grant funds | 🔜 Allow reusing a SHARE with a new destination after validation — round index, partial contract reset while keeping members and shares. | Low |

---

## Category 4 — Vision V3+ (Major integrations or out of scope) 🚧

Requires external primitives, oracles, or deep architectural changes.

| # | Use Case | Audience | Missing Elements | Risk |
|:---|:---|:---|:---|:---|
| **23** | **Collective DeFi Investment (Yield)** | DeFi investors | 🚧 Venus/Alpaca Finance integration on BSC + aToken management + validated collective withdrawal + additional audit. ⚠️ Regulatory custody — holding people's money for months = potentially regulated. | High ⚠️ |
| **24** | **Advanced ROSCA Tontine with Native Mobile Money** | Non-crypto Africa, Asia | 🚧 Commercial M-Pesa/Orange Money partnership (3-6 months + local entity) or Kotani Pay/Yellow Card API. Meanwhile: Binance P2P guide suffices. | Medium |
| **25** | **Automated Crypto Will** | Long-term holders | 🚧 Inactivity oracle (Chainlink Automation) + anti-false positive mechanism across multiple chains + legal inheritance implications. | High ⚠️ |
| **26** | **Parametric Insurance** | Farmers, businesses | 🚧 Chainlink Oracles (weather, price) to trigger `validate()` automatically. ⚠️ Offering insurance is illegal without a license — position as infrastructure for DeFi insurers only. | Very High ⚠️ |
| **27** | **Pure Atomic Swap — Trustless OTC** | Whales, large traders | 🚧 V3 or out of scope — very heavy to implement from scratch. Recommendation: use an existing aggregator (1inch, Paraswap) instead of reinventing the mechanics. Different from case #13 (simple USDT escrow). | Low |

---

## Synthesis — Go-to-Market Priorities

### 🥇 Immediate Launch — BNB Chain Crypto Audience
**Cases #1 + #2** — Group buy presale + Token Sale via PerShare

Audience already present on BNB Chain. Real pain point (high minimum tickets). No direct competitors. Viral in crypto Telegram groups. The meta-case (PerShare uses PerShare for its own presale) is the best possible demo.

### 🥈 Short Term — General Public and Diasporas
**Cases #9 + #10** — Collective Money Pool + Digital Tontine

Massive market unaddressed by existing Web3 tools. Strong network effect (each tontine brings 5-20 new users). Mobile Money via Binance P2P is sufficient to start without technical integration.

### 🥉 Medium Term — Builder and B2B Audience
**Cases #3 + #8 + #14** — Freelance Escrow + Hackathon Prize + Team Payment

Targeted and influential builder community. Strong peer recommendation. Hackathon partnerships achievable in V1.

---

## Global Watchpoints ⚠️

1. **setExpectedToken (#1)** — Mandatory step before Phase 2 presale. Must be explicitly guided in the UI otherwise members won't know what to do after funds are sent.
2. **Security Deposit (#5)** — The landlord must have a wallet. High friction for non-crypto. Addressed by fiat on-ramp in V1.5.
3. **Semi-Secure OTC (#13)** — Not an atomic swap. Use it as a "USDT escrow" while waiting for case #27 (V3+ or external aggregator).
4. **Public Crowdfunding (#16)** — High regulatory risk. SEC/MiCA may take an interest. Legal counsel mandatory before deployment.
5. **Multi-round Grants (#22)** — Needs clear definition if partial contract reset keeps history or starts from zero — impacts onchain transparency.
6. **Collective DeFi (#23)** — Regulatory custody. Holding user funds for months may trigger a license obligation.
7. **Parametric Insurance (#26)** — Offering insurance directly is illegal without a license in most countries. Position as infrastructure only.
8. **Rotating ROSCA Tontine (#17)** — Automatic rotation requires an external keeper (Chainlink Automation). Additional dependency to audit.

---

*PerShare — SHARE. Each member receives their share. Automatically.*
