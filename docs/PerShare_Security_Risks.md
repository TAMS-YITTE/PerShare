# PerShare V1 - Sécurité & Risques Opérationnels

Suite aux audits de sécurité rigoureux et à l'implémentation de notre architecture hermétique (Phase 2), le smart contract PerShare V1 est certifié **sans faille de sécurité critique**. Le code est mathématiquement verrouillé pour empêcher le vol ou le siphonnage de fonds entre différentes cagnottes (Shares).

Cependant, la nature décentralisée du Web3 implique des responsabilités claires. Ce document recense les risques résiduels (exclusivement liés à des erreurs de configuration) et nos recommandations de gouvernance. Ce document servira de base légale et informative pour les utilisateurs du site web.

---

## ⚠️ Risques résiduels (Opérationnels, non liés au code)

Ces risques incombent aux administrateurs de la plateforme et aux créateurs de Shares. Ils doivent être communiqués de manière transparente.

| Risque | Impact | Mitigation (Comment l'éviter) |
|--------|--------|-------------------------------|
| **`platformToken` malveillant** | `balanceOf` peut consommer trop de gaz (DoS, blocage) | L'admin doit configurer uniquement un token ERC‑20 standard et audité (ex: le jeton natif SHARE). |
| **`feeRecipient` non contrôlé** | Les frais récoltés pourraient être perdus | L'admin doit utiliser une adresse EOA sécurisée (ex: Ledger) ou un portefeuille multisig robuste (Safe) qu'il contrôle intégralement. |
| **`destination` malveillante** | Les fonds peuvent être bloqués à destination (ils ne seront pas perdus, mais inexploitables) | **Responsabilité du créateur :** Afficher un disclaimer clair lors de la création d'un SHARE : "Le créateur est l'unique responsable de l'adresse de destination de la cagnotte." |
| **`expectedToken` non standard** | `safeTransfer` peut échouer (blocage de la distribution) | **Responsabilité du créateur :** La plateforme intègre une vérification technique (`.code.length > 0`) pour empêcher l'usage d'adresses privées, mais le créateur doit s'assurer que le token sélectionné respecte le standard ERC-20 (`transfer`, `balanceOf`). |

---

## 🚀 Recommandations pour le déploiement & Go-to-Market

Afin de garantir un lancement optimal et de rassurer la communauté, voici la feuille de route opérationnelle :

1. **Déploiement sur BNB Testnet (Phase Beta)** 
   Validation en conditions réelles avec l'interface web (dApp), de vrais utilisateurs bêta-testeurs et des tokens fictifs (Mock).
2. **Tests de charge massifs (Stress Tests)** 
   Simulation de volumes importants : création de multiples SHAREs simultanés, injection de gros montants, et tests de résistance face au front-running réseau.
3. **Double vérification externe (Optionnel mais recommandé)** 
   Soumettre la version corrigée et compilée finale à un second auditeur (CertiK, Hacken, ou un second passage de SPYWOLF) pour afficher un double sceau de sécurité sur la Landing Page.
4. **Publication de la Documentation (Clear Guidelines)** 
   Intégrer les éléments de ce document dans les Conditions Générales d'Utilisation (Terms of Service) et les FAQs pour sensibiliser les créateurs de SHAREs à leurs responsabilités.

---

### ✅ Verdict de Sécurité
**PerShare est une infrastructure solide et hermétique, prête pour le testnet, puis le mainnet.** Les mécanismes de *Pull Pattern*, de comptabilité séparée (*depositTokens*), et de nettoyage (*sweepDust*) garantissent un fonctionnement fluide même en cas de comportement malveillant d'un tiers. 🎯
