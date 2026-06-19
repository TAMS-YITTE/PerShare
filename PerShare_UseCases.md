# PerShare — Cas d'Usage, Maturité & Roadmap
> Document consolidé — fusion des trois analyses
> Version : 1.2 — Juin 2025

---

## Légende

| Icône | Signification |
|:---:|:---|
| ✅ | Disponible V1 — aucun changement de code requis |
| 🟡 | Partiel V1 — contrat OK, frontend ou intégration à compléter |
| 🔜 | V2 — nécessite des fonctionnalités additionnelles dans le contrat |
| 🚧 | V3+ — nécessite des intégrations externes majeures ou hors scope |
| ⭐ | Hook marketing prioritaire au lancement |
| ⚠️ | Point de vigilance réglementaire ou technique |

---

## Catégorie 1 — Immédiatement monétisables (V1) ✅

Cas d'usage reposant sur le cœur du contrat V1. Aucun changement de code requis.

| # | Cas d'usage | Audience | Taille marché | Ce qui manque | Risque |
|:---|:---|:---|:---|:---|:---|
| **1** | **Achat groupé en presale (Syndicat) ⭐** | Traders BNB Chain, dégénérés crypto | Fort — des dizaines de presales par jour sur BSC | ✅ Rien. Phase 1 + Phase 2 + Dust complets. ⚠️ Le créateur doit appeler `setExpectedToken()` avant réception des tokens du presale — à documenter clairement dans l'UI. Manque : page listing presales partenaires sur le frontend. | Faible |
| **2** | **Vente de tokens via PerShare ⭐** | Fondateurs crypto, créateurs de projets | Fort — PerShare EST le contrat de presale | ✅ Rien. Manque : page dédiée "Lancer ton presale" dans le frontend + guide de création. C'est le méta-cas d'usage — PerShare finance PerShare avec PerShare. | Faible |
| **3** | **Escrow Web3 / Paiement B2B** | Freelances, DAOs, clients crypto | Très fort — alternative à Upwork (20% commission) | ✅ Rien. Threshold = 2 entre client et freelance. Manque : mode "Escrow" dans l'UI avec workflow mission / livraison / validation. | Faible |
| **4** | **Safe personnel multi-signataires** | Holders prudents, équipes fondatrices | Moyen — niche sécurité | ✅ Rien. Threshold personnalisé sur ses propres wallets. Manque : mode "Épargne Sécurisée" dans l'UI + explication claire du cas d'usage. | Faible |
| **5** | **Dépôt de garantie / Séquestre** | Particuliers, agences immobilières crypto | Moyen — cautions locatives, matériel | ✅ Rien. Remboursement automatique à la deadline si pas de validation. ⚠️ Le propriétaire doit avoir un wallet — friction pour les non-crypto. Friction réduite en V1.5 avec on-ramp carte. | Faible |
| **6** | **Trésorerie DAO informelle / Subventions simples** | Communautés Web3, collectifs | Moyen — alternative aux Gnosis Safe complexes | ✅ Rien. Majorité configurable (ex: 3/5). Manque : intégration Discord/Telegram bot pour notifier les membres. | Faible |
| **7** | **Paiement P2P sécurisé (Le Bon Coin Web3)** | Grand public crypto, acheteurs/vendeurs | Fort — marché C2C massif | ✅ Rien. Acheteur dépose, vendeur expédie, validation croisée libère. Manque : mode "Achat/Vente entre particuliers" dans l'UI + réputation onchain des vendeurs en V2. | Faible |
| **8** | **Prize hackathon — distribution équipe** | Builders, développeurs, équipes | Moyen — communauté ciblée mais fidèle | ✅ Rien. Pool partagée entre les membres de l'équipe gagnante. Manque : partenariats ETHGlobal, DoraHacks, Gitcoin pour référencement officiel. | Faible |
| **9** | **Cagnotte collective** | Grand public | Très fort — alternative à Leetchi (3% commission) | ✅ Rien. Manque : on-ramp carte bancaire (Transak) pour les non-crypto + page publique partageable sur les réseaux sociaux. | Faible |

---

## Catégorie 2 — Utilisables en V1, optimaux avec le Frontend V1.5 🟡

Contrat fonctionnel, mais une friction d'interface, d'intégration ou une limite technique limite l'adoption.

| # | Cas d'usage | Audience | Taille marché | Ce qui manque (Frontend V1.5) | Risque |
|:---|:---|:---|:---|:---|:---|
| **10** | **Tontine numérique (ROSCA simple) ⭐** | Afrique, Asie, diasporas | Massif — 600M+ pratiquants mondiaux | 🟡 Contrat OK pour la version non-rotative. Manque : guide Mobile Money (Binance P2P, Yellow Card) intégré dans l'UI + frontend en français/swahili/wolof + partenariats communautés tontine. | Faible |
| **11** | **Launchpad privé communautaire** | Créateurs de tokens, communautés | Fort — alternative à PinkSale avec plus de contrôle | 🟡 Contrat OK. Manque : interface créateur dédiée pour fluidifier création des membres et envoi Phase 2 + gestion vesting manuel. | Faible |
| **12** | **Charges de colocation** | Étudiants, jeunes actifs | Fort — problème quotidien universel | 🟡 Contrat OK. Manque : SHARE récurrent (recréation mensuelle automatique) en V2 + on-ramp carte pour les non-crypto + interface ultra-simplifiée. | Faible |
| **13** | **OTC semi-sécurisé (escrow USDT)** | Whales, gros traders | Moyen — gros volumes unitaires | 🟡 L'acheteur bloque les USDT dans le SHARE. Le vendeur envoie ses tokens manuellement. Si le vendeur ne livre pas, l'acheteur peut déclencher un refund après la deadline. ⚠️ Pas un swap atomique — le contrat ne sécurise pas le token du vendeur. Utile en attendant le cas #27 (V3+). | Moyen |
| **14** | **Paiement fournisseur multi-signatures** | Startups crypto, équipes | Moyen | 🟡 Contrat OK. Manque : mode "Trésorerie d'équipe" dans l'UI + historique transactions par équipe + export CSV comptable. | Faible |
| **15** | **Revenue share créateurs (collab ponctuelle)** | YouTubeurs, artistes, influenceurs | Fort — économie créateur en explosion | 🟡 Contrat OK pour revenus ponctuels. Manque : distribution USDT interne en V2 pour les revenus récurrents + intégration plateformes. | Faible |

---

## Catégorie 3 — Roadmap V2 (évolution contrat) 🔜

Nécessitent des fonctionnalités additionnelles dans le smart contract.

| # | Cas d'usage | Audience | Ce qui manque (Contrat V2) | Risque |
|:---|:---|:---|:---|:---|
| **16** | **Crowdfunding / ICO publiques ouvertes** | Grand public, porteurs de projets | 🔜 Architecture lourde : remplacement du tableau `members` par un système d'inscription ouverte (mapping dynamique, validation publique, anti-spam). ⚠️ Risque réglementaire élevé — levée publique potentiellement soumise à AMF/MiCA/SEC. Conseil juridique obligatoire avant déploiement. | Élevé ⚠️ |
| **17** | **Tontine ROSCA avec rotation automatique** | Communautés tontine structurées | 🔜 Index rotatif du bénéficiaire + réinitialisation automatique du share + time-lock cyclique + Chainlink Automation pour la rotation mensuelle sans intervention humaine. | Moyen |
| **18** | **Vesting cofondateurs** | Startups, équipes fondatrices | 🔜 Logique de vesting (déblocage progressif par tranches) + cliff period + révocation en cas de départ + distribution USDT interne. | Faible |
| **19** | **Commission apporteur d'affaires** | Sales, commerciaux, affiliés | 🔜 Distribution USDT interne + SHARE récurrent + déclenchement par événement externe (webhook quand vente confirmée). | Faible |
| **20** | **Abonnement collectif (Netflix, SaaS)** | Amis, collègues | 🔜 SHARE récurrent mensuel + on-ramp carte + off-ramp vers service abonné. ⚠️ Service doit accepter la crypto ou nécessite intermédiaire fiat. | Moyen |
| **21** | **Achat groupé NFT** | Collectors, dégénérés NFT | 🔜 Support ERC-721/1155 : implémenter `onERC721Received` et `onERC1155Received` + fonction de vente avec vote des membres + gouvernance de revente intégrée. | Moyen |
| **22** | **Gestion de subventions à plusieurs tours** | DAOs, fonds de grants | 🔜 Permettre la réutilisation d'un SHARE avec une nouvelle destination après validation — index de tour, reset partiel du contrat tout en conservant les membres et les parts. | Faible |

---

## Catégorie 4 — Vision V3+ (intégrations majeures ou hors scope) 🚧

Nécessitent des primitives externes, des oracles, ou des changements architecturaux profonds.

| # | Cas d'usage | Audience | Ce qui manque | Risque |
|:---|:---|:---|:---|:---|
| **23** | **Investissement collectif DeFi (yield)** | Investisseurs DeFi | 🚧 Intégration Venus/Alpaca Finance sur BSC + gestion des aTokens + retrait collectif validé + audit supplémentaire. ⚠️ Custody réglementaire — garder l'argent des gens des mois = potentiellement régulé. | Élevé ⚠️ |
| **24** | **Tontine ROSCA avancée avec Mobile Money natif** | Afrique, Asie non-crypto | 🚧 Partenariat commercial M-Pesa/Orange Money (3-6 mois + entité locale) ou API Kotani Pay/Yellow Card. En attendant : guide Binance P2P suffit. | Moyen |
| **25** | **Testament crypto automatisé** | Holders long terme | 🚧 Oracle d'inactivité (Chainlink Automation) + mécanisme anti-faux positif sur plusieurs chains + implications légales successorales. | Élevé ⚠️ |
| **26** | **Assurance paramétrique** | Agriculteurs, entreprises | 🚧 Oracles Chainlink (météo, prix) pour déclencher `validate()` automatiquement. ⚠️ Proposer de l'assurance est illégal sans licence — positionner comme infrastructure pour assureurs DeFi uniquement. | Très élevé ⚠️ |
| **27** | **Swap atomique pur — Trustless OTC** | Whales, gros traders | 🚧 V3 ou hors scope — très lourd à implémenter de zéro. Recommandation : utiliser un aggregator existant (1inch, Paraswap) plutôt que de réinventer la mécanique. Différent du cas #13 (escrow USDT simple). | Faible |

---

## Synthèse — Priorités Go-to-Market

### 🥇 Lancement immédiat — Audience crypto BNB Chain
**Cas #1 + #2** — Group buy presale + Vente de tokens via PerShare

Audience déjà présente sur BNB Chain. Douleur réelle (tickets minimum élevés). Aucun concurrent direct. Viral dans les groupes Telegram crypto. Le méta-cas (PerShare utilise PerShare pour son propre presale) est la meilleure démo possible.

### 🥈 Court terme — Audience grand public et diasporas
**Cas #9 + #10** — Cagnotte collective + Tontine numérique

Marché massif non adressé par les outils Web3 existants. Effet réseau fort (chaque tontine amène 5-20 nouveaux utilisateurs). Mobile Money via Binance P2P suffit pour démarrer sans intégration technique.

### 🥉 Moyen terme — Audience builder et B2B
**Cas #3 + #8 + #14** — Escrow freelance + Prize hackathon + Paiement équipe

Communauté builder ciblée et prescriptrice. Recommandation forte entre pairs. Partenariats hackathons réalisables dès V1.

---

## Points de vigilance globaux ⚠️

1. **setExpectedToken (#1)** — Étape obligatoire avant la Phase 2 presale. Doit être guidée explicitement dans l'UI sinon les membres ne savent pas quoi faire après l'envoi des fonds.

2. **Dépôt de garantie (#5)** — Le propriétaire doit avoir un wallet. Friction élevée pour les non-crypto. Adressé par l'on-ramp carte en V1.5.

3. **OTC semi-sécurisé (#13)** — Pas un swap atomique. L'utiliser comme "escrow USDT" en attendant le cas #27 (V3+ ou aggregator externe).

4. **Crowdfunding public (#16)** — Risque réglementaire élevé. AMF/MiCA/SEC peuvent s'y intéresser. Conseil juridique obligatoire avant déploiement.

5. **Subventions multi-tours (#22)** — Nécessite de définir clairement si le reset partiel du contrat conserve l'historique ou repart à zéro — impact sur la transparence onchain.

6. **DeFi collectif (#23)** — Custody réglementaire. Garder l'argent des utilisateurs des mois peut déclencher une obligation de licence.

7. **Assurance paramétrique (#26)** — Proposer directement de l'assurance est illégal sans licence dans la plupart des pays. Positionner comme infrastructure uniquement.

8. **Tontine ROSCA rotative (#17)** — La rotation automatique nécessite un keeper externe (Chainlink Automation). Dépendance supplémentaire à auditer.

---

*PerShare — SHARE. Chaque membre reçoit sa part. Automatiquement.*
