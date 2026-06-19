# PerShare — SHARE

> Chaque membre reçoit sa part. Automatiquement. Onchain.

## Structure du projet

```
contracts/
  PerShareV1.sol          Contrat principal — 7 fonctions
  MockUSDT.sol            USDT de test (BNB Testnet uniquement)
  MockPresaleToken.sol    Token presale de test (Phase 2)

scripts/
  deploy.js               Deploiement BNB Testnet + Mainnet

test/
  PerShare.test.js        45 tests unitaires complets

frontend-nextjs/
  src/app/                Pages Next.js (Dashboard + Share Details)
  src/hooks/useShare.ts   Hooks wagmi pour le contrat
  src/components/         Composants UI (ShareCard, CreateShareModal)
  src/lib/contract.ts     ABI + adresses

docs/
  PerShare_Whitepaper_V1.docx   Whitepaper complet
  PerShare_Deck_V1.pptx         Pitch deck 12 slides
  PerShare_Specs_V1.docx        Specifications techniques
```

## Fonctionnalités Principales (Sécurisées)

- **Phase 1 (Collecte) & Phase 2 (Redistribution)**
- **Sécurité Anti-Dust** : Les poussières de jetons dues aux arrondis de division asymétrique sont transférées au premier membre.
- **Sécurité Anti-Collision** : `expectedToken` garantit qu'aucun token malicieux ne puisse déclencher la validation de la Phase 2.
- **Frais Dynamiques & Sécurisés** : Commission par défaut de 1% (maximum 5%), envoyée à une adresse `feeRecipient` distincte pour plus de sécurité.
- **Tokenomics (Dormant)** : Pré-intégration du futur jeton de plateforme `$SHARE` qui exemptera de frais (0%) les créateurs en détenant un certain seuil.
- **Remboursement Public (Permissionless)** : En cas d'échec (deadline passée), n'importe qui peut déclencher le `refund` pour débloquer les fonds des membres inactifs.
- **Kill-Switch (Pausable & Ownable)** : Permet de bloquer temporairement les transactions en cas de faille détectée.

## Demarrage rapide

```bash
# 1. Installer les dependances
npm install

# 2. Copier et remplir les variables
cp .env.example .env

# 3. Compiler le contrat (viaIR active pour optimiser la pile EVM)
npx hardhat compile

# 4. Lancer les tests
npx hardhat test

# 5. Deployer sur BNB Testnet
npx hardhat run scripts/deploy.js --network bscTestnet

# 6. Lancer le frontend
cd frontend-nextjs
npm install
npm run dev
```

## Adresses BNB Mainnet

| Token | Adresse |
|---|---|
| USDT | 0x55d398326f99059fF775485246999027B3197955 |
| USDC | 0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d |

## Avant le mainnet

- [x] npx hardhat compile — zero erreur
- [x] npx hardhat test — 45 tests verts (100% success rate)
- [x] Integration UI & Frontend Next.js
- [ ] Deploiement BNB Testnet
- [ ] Tests manuels avec vrais wallets
- [ ] Audit de securite (Certik / Hacken / PeckShield)
- [ ] Rapport d'audit publie sur BscScan
- [ ] Deploiement BNB Mainnet

## Contact

pershare.io
