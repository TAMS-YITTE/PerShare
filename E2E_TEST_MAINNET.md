# PerShare — Jeu de test E2E Mainnet (KISS)

> Objectif : prouver que le flux réel marche sur BNB Chain avec de vrais wallets/USDT.
> Coût : ~2 USDT (récupérés) + quelques centimes de gas. Durée : ~15 min. 2 wallets.

## Adresses utiles (BSC Mainnet)

| Élément | Adresse |
|---|---|
| Contrat **Standard** (1%) | `0x35B4BAf4Af02151A76e4e00eA3411EDe495f463a` |
| Contrat Social (0,5%) | `0x646D044703a80E424E20fe78d10ED624383Fa303` |
| Contrat Premium (2%) | `0xCA962143652fC02476501f5d32901E5aaaC9F1aD` |
| USDT (BEP-20) | `0x55d398326f99059fF775485246999027B3197955` |
| feeRecipient / owner (Safe 2/3) | `0x996EE7A18dFa32aB77c05D8eBF94F13082bB9a5D` |
| App | https://www.pershare.org/app |

---

## Pré-requis (une fois)

- [ ] **2 wallets** dans MetaMask : **W1** (créateur) + **W2** (membre), réseau **BNB Smart Chain (mainnet)**.
- [ ] Un peu de **BNB** sur chaque pour le gas (~0,003 BNB ≈ 1 $ suffit).
- [ ] **~2 USDT** sur W1 et **~1 USDT** sur W2.
- [ ] **Un token BEP-20 quelconque** (même sans valeur, ex: vieux shitcoin) sur W1 pour tester la distribution.
- 💡 Mettre **destination = W1**. Et comme le `feeRecipient` est **ton Safe**, même le 1 % te revient → le test ne coûte quasi que le gas.

---

## ✅ TEST 0 — Sécurité Frontend (VIP Tier)

1. **www.pershare.org/app** → **Connect Wallet** avec **W2** (qui n'est pas dans la liste VIP).
2. **Create SHARE** : Cliquez sur le tier **"Social"**.
3. **Vérif** : Le bouton doit être visuellement désactivé, l'action bloquée, et un message d'erreur rouge doit s'afficher.

---

## ✅ TEST 1 — Chemin nominal (Collecte & Envoi)

1. Reconnecter **W1** (créateur VIP ou non).
   - ⚠️ Si le modal Reown ne s'ouvre pas → c'est l'allowlist `www.pershare.org` à régler dans le dashboard Reown/WalletConnect.
2. **Create SHARE** :
   - Members : adresse **W1** + adresse **W2**
   - Stablecoin : **USDT**
   - Destination : **W1**
   - Target : **2**
   - Deadline : **demain**
   - Threshold : **2**
   - ☑️ cocher la case d'acceptation → **Create** → signer.
3. **W1** : **Approve USDT** puis **Contribute 1 USDT**.
4. Basculer sur **W2** (reconnecter avec W2), ouvrir le même SHARE → **Approve** + **Contribute 1 USDT**. → cible atteinte **2/2**.
5. **Validate** avec W1, puis **Validate** avec W2 → au 2ᵉ, **l'envoi se déclenche automatiquement**.
6. **Vérif sur BscScan** (contrat Standard) :
   - [ ] destination (W1) a reçu **~1,98 USDT**
   - [ ] le Safe (`0x996E…9a5D`) a reçu **~0,02 USDT** (le 1 %)

**→ OK = pooling + contribution + consensus + envoi + fee prouvés en réel.**

---

## ✅ TEST 2 — Distribution (Phase 3)

*À faire dans la foulée du Test 1 sur le même contrat (W1 = créateur).*
1. **Set Token (W1)** : onglet *Phase 3* → entrer l'adresse du token BEP-20 de test → **Set Token**.
2. **Approve & Deposit (W1)** : dans le bloc « Deposit Tokens (Creator only) », entrer le montant (ex: **1000**) → **Approve & Deposit** (2 signatures : approve, puis le dépôt se déclenche tout seul).
   - ⚠️ **NE PAS** envoyer les tokens par transfert direct au contrat : le contrat est *hermétique*, seul `depositTokens` (ce bouton) crédite la cagnotte. Un `transfer()` brut ne sera **pas** compté.
3. **Validation (W1 & W2)** : chaque membre clique sur **Validate my Address to Receive my Tokens**.
4. **Claim (W1 & W2)** : chaque membre clique sur **Claim My Tokens**.
5. **Vérif** : W1 et W2 ont reçu chacun **500 tokens** (pro-rata exact de leur dépôt de 1 USDT chacun) !

**→ OK = calcul pro-rata + distribution automatique prouvés.**

---

## ✅ TEST 3 — Remboursement (filet de sécurité)

1. **Create SHARE** : Members W1+W2, Target **2**, **Deadline** : *Astuce : choisissez une date très proche (+ 5 min)*, Threshold 2.
2. **W1** : Approve + Contribute **1 USDT** seulement (cible **pas** atteinte).
3. **Attendre que la deadline passe** (quelques minutes).
4. Rouvrir le SHARE avec W1 → **« 1. Mark Share as Refunded »** (ouvre le remboursement), puis **« 2. Claim My Refund »** → récupérer le **1 USDT** (0 frais). *(Le refund se fait en 2 étapes.)*

**→ OK = remboursement automatique prouvé.**

---

## Ce que ça couvre

Connect Wallet (allowlist Reown), sécurité UI (VIP tier), création, approve, contribution, **consensus/validation**, **envoi auto + prélèvement correct du fee**, **distribution pro-rata exacte** et **remboursement**. → **100 % du risque technique** couvert.

## Checklist go-live (rappel)

- [ ] Test 0 (UI VIP)
- [ ] Test 1 (Chemin nominal : Collecte/Envoi)
- [ ] Test 2 (Chemin nominal : Distribution Phase 3)
- [ ] Test 3 (Refund)
- [ ] Allowlist domaine `www.pershare.org` dans Reown
- [ ] Revue avocat MiCA (applicabilité + décision geofencing)
- [x] Ownership multisig Safe 2/3
- [x] feeBPS corrects on-chain (0,5 / 1 / 2 %)
