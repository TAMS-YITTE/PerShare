# PerShare — Cas d'Usage & Stratégie de Déploiement (Par Taux de Frais)
> Document consolidé — Juin 2025
> **Note Stratégique :** Les cas d'usage bilatéraux (1-to-1) sont exclus (réservés à EscrowX). PerShare se concentre sur l'achat et la collecte de groupe (N-to-1 ou N-to-N). 
> **Architecture de Frais :** Le smart contract appliquant un taux global, l'offre commerciale est structurée en déployant **différentes instances du contrat PerShare**, chacune configurée avec son propre `feeBPS`.

---

## 1. Déclinaison "Social & Charity" (Frais : 0%)
*Instance déployée avec `feeBPS = 0`. But : Acquisition utilisateur de masse, image de marque, onboarding Web3.*

| Cas d'Usage | Description |
|:---|:---|
| **Cagnotte Publique / Caritative** | Financer un projet caritatif, associatif ou personnel. L'équivalent de Leetchi Web3, gratuit, pour attirer le grand public. |
| **Distribution de Hackathon** | Répartir automatiquement la prime (Bounty) gagnée entre les développeurs d'une équipe sans frais, pour attirer les builders. |
| **Impact Investing (Carbone)** | Financer des projets écologiques. La gratuité encourage la participation à des causes à impact (avec jetons "Crédits Carbone" en retour). |

## 2. Déclinaison "Standard / Communauté" (Frais : 1%)
*Instance déployée avec `feeBPS = 100` (1%). But : Volume transactionnel régulier et génération de revenus de base.*

| Cas d'Usage | Description |
|:---|:---|
| **Syndicat d'Investissement (Presale)** | Se grouper (KOLs, communautés) pour atteindre le ticket minimum d'une prévente privée. Le cas d'usage "star" à forte demande. |
| **Achat OTC Communautaire** | Une communauté achète un gros lot de tokens à prix réduit directement à une "Whale" pour contourner le marché public. |
| **Achat de Node / Actif Cher** | Mutualiser les fonds pour acheter un Node validateur (ex: Gala) ou un NFT Blue Chip (géré par un multisig ensuite). |
| **Guilde Gaming (Play-to-Earn)** | Les joueurs se cotisent pour acheter des actifs *in-game*. Les rendements Play-to-Earn générés sont redistribués. |

## 3. Déclinaison "Premium / DeFi & Finance" (Frais : 2%)
*Instance déployée avec `feeBPS = 200` (2%). But : Cas d'usage complexes, générateurs de rendements ou pour professionnels.*

| Cas d'Usage | Description |
|:---|:---|
| **Token Sale Natif (Launchpad)** | Les fondateurs utilisent PerShare pour lever des fonds directement auprès de leur communauté. La plateforme prend 2% de "success fee" sur la levée. |
| **Fourniture de Liquidité (LP Pool)** | Création de la première Pool de Liquidité d'un DEX en groupe. Cas financier avancé justifiant un premium. |
| **Incubateur Décentralisé (Angels)** | Des experts financent l'amorçage d'un projet ; les tokens sont renvoyés automatiquement à PerShare au lancement. |
| **Cloud Mining Communautaire** | Louer/acheter des ASIC de minage en groupe. Les revenus minés sont reversés mensuellement (génération de revenus passifs). |
| **Immobilier Tokenisé (RWA)** | Acheter en groupe une part d'immeuble (ex: RealT) et distribuer les jetons associés. Achat lié à des actifs réels à haut rendement. |

---
*Chaque déclinaison nécessitera le déploiement d'une nouvelle adresse de contrat PerShare configurée avec le bon taux de commission.*
