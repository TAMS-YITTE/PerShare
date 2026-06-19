const fs = require('fs');
const path = require('path');

const contractPath = path.join(__dirname, '../contracts/PerShareV1.sol');
let content = fs.readFileSync(contractPath, 'utf8');

const replacements = {
  '"PerShare: pas membre"': '"PerShare: not a member"',
  '"PerShare: deja envoye"': '"PerShare: already sent"',
  '"PerShare: deja rembourse"': '"PerShare: already refunded"',
  '"PerShare: feeRecipient invalide"': '"PerShare: invalid feeRecipient"',
  '"PerShare: adresse invalide"': '"PerShare: invalid address"',
  '"PerShare: threshold invalide"': '"PerShare: invalid threshold"',
  '"PerShare: nom requis"': '"PerShare: name required"',
  '"PerShare: min 2 membres"': '"PerShare: min 2 members"',
  '"PerShare: max 50 membres"': '"PerShare: max 50 members"',
  '"PerShare: stablecoin invalide"': '"PerShare: invalid stablecoin"',
  '"PerShare: destination invalide"': '"PerShare: invalid destination"',
  '"PerShare: objectif requis"': '"PerShare: target required"',
  '"PerShare: deadline dans le futur"': '"PerShare: deadline must be in future"',
  '"PerShare: threshold min 1"': '"PerShare: min 1 threshold"',
  '"PerShare: threshold <= nb membres"': '"PerShare: threshold > members"',
  '"PerShare: membre invalide"': '"PerShare: invalid member"',
  '"PerShare: membre en double"': '"PerShare: duplicate member"',
  '"PerShare: deadline passee"': '"PerShare: deadline passed"',
  '"PerShare: montant requis"': '"PerShare: amount required"',
  '"PerShare: transfert echoue"': '"PerShare: transfer failed"',
  '"PerShare: objectif pas atteint"': '"PerShare: target not reached"',
  '"PerShare: deja valide"': '"PerShare: already validated"',
  '"PerShare: envoi destination echoue"': '"PerShare: destination transfer failed"',
  '"PerShare: envoi commission echoue"': '"PerShare: commission transfer failed"',
  '"PerShare: phase 1 pas terminee"': '"PerShare: phase 1 not finished"',
  '"PerShare: deja distribue"': '"PerShare: already distributed"',
  '"PerShare: token invalide"': '"PerShare: invalid token"',
  '"PerShare: token attendu non defini"': '"PerShare: expected token not set"',
  '"PerShare: mauvais token"': '"PerShare: wrong token"',
  '"PerShare: deja valide distribution"': '"PerShare: already validated dist"',
  '"PerShare: pas de tokens recus"': '"PerShare: no tokens received"',
  '"PerShare: redistribution echouee"': '"PerShare: redistribution failed"',
  '"PerShare: redistribution poussiere echouee"': '"PerShare: dust redistribution failed"',
  '"PerShare: deadline pas encore passee"': '"PerShare: deadline not passed yet"',
  '"PerShare: rien a rembourser"': '"PerShare: nothing to refund"',
  '"PerShare: remboursement echoue"': '"PerShare: refund failed"',
  '"PerShare: pas le createur"': '"PerShare: not the creator"'
};

for (const [fr, en] of Object.entries(replacements)) {
  content = content.replaceAll(fr, en);
}

// Replace comments
content = content.replace(/\/\/ PHASE 1 — Collecte USDT \+ validation collective \+ envoi vers destination/g, '// PHASE 1 - USDT Collection + collective validation + sending to destination');
content = content.replace(/\/\/ PHASE 2 — Reception tokens BEP-20 du presale \+ validation \+ redistribution/g, '// PHASE 2 - BEP-20 presale tokens reception + validation + redistribution');
content = content.replace(/\/\/ Exclus volontairement :/g, '// Intentionally excluded:');
content = content.replace(/\/\/   - Cancel \/ Pause \(V2\)/g, '//   - Cancel / Pause (V2)');
content = content.replace(/\/\/   - Distribution USDT interne aux membres \(V2\)/g, '//   - Internal USDT distribution to members (V2)');
content = content.replace(/\/\/   - Vesting \(V2\)/g, '//   - Vesting (V2)');
content = content.replace(/\/\/   - Integration DeFi \(exclue definitivement\)/g, '//   - DeFi Integration (permanently excluded)');
content = content.replace(/\/\/   - Tokens non BEP-20 : Solana, SUI, TON \(hors perimetre\)/g, '//   - Non-BEP-20 Tokens: Solana, SUI, TON (out of scope)');
content = content.replace(/\/\/   - NFT ERC-721 \(V1\.5 si demande marche\)/g, '//   - ERC-721 NFT (V1.5 if market demands)');
content = content.replace(/\/\/ "SHARE — chaque membre recoit sa part\. Automatiquement\."/g, '// "SHARE - every member gets their share. Automatically."');

content = content.replace(/Nom court :/g, 'Short name:');
content = content.replace(/Structure principale — un SHARE/g, 'Main structure - a SHARE');
content = content.replace(/Wallet createur du SHARE/g, 'SHARE creator wallet');
content = content.replace(/Liste des membres/g, 'List of members');
content = content.replace(/USDT ou USDC \(adresse BEP-20\)/g, 'USDT or USDC (BEP-20 address)');
content = content.replace(/Wallet externe — presale ou tiers/g, 'External wallet - presale or third party');
content = content.replace(/Objectif en stablecoin/g, 'Stablecoin target');
content = content.replace(/Timestamp Unix — fin de collecte/g, 'Unix Timestamp - end of collection');
content = content.replace(/Nb validations pour declencher envoi/g, 'Number of validations to trigger sending');
content = content.replace(/Total stablecoin collecte/g, 'Total stablecoin collected');
content = content.replace(/Phase 1 terminee/g, 'Phase 1 finished');
content = content.replace(/SHARE rembourse/g, 'SHARE refunded');
content = content.replace(/Phase 2 terminee/g, 'Phase 2 finished');
content = content.replace(/Token BEP-20 attendu pour la phase 2/g, 'Expected BEP-20 token for Phase 2');
content = content.replace(/FONCTION 1 — Creer un SHARE/g, 'FUNCTION 1 - Create a SHARE');
content = content.replace(/FONCTION 2 — Contribuer a un SHARE/g, 'FUNCTION 2 - Contribute to a SHARE');
content = content.replace(/FONCTION 3 — Valider l'envoi \(Phase 1\)/g, 'FUNCTION 3 - Validate sending (Phase 1)');
content = content.replace(/FONCTION 4 — Envoi des fonds \(interne Phase 1\)/g, 'FUNCTION 4 - Send funds (Internal Phase 1)');
content = content.replace(/FONCTION 5 — Valider la redistribution \(Phase 2 — group buy presale\)/g, 'FUNCTION 5 - Validate redistribution (Phase 2 - group buy presale)');
content = content.replace(/FONCTION 6 — Redistribution tokens \(interne Phase 2\)/g, 'FUNCTION 6 - Token redistribution (Internal Phase 2)');
content = content.replace(/FONCTION 7 — Remboursement si deadline expiree/g, 'FUNCTION 7 - Refund if deadline expired');
content = content.replace(/FONCTIONS ADMIN ET CONFIGURATION/g, 'ADMIN AND CONFIGURATION FUNCTIONS');
content = content.replace(/FONCTIONS DE LECTURE/g, 'READ FUNCTIONS');
content = content.replace(/Pool de paiement collectif onchain/g, 'Onchain collective payment pool');

fs.writeFileSync(contractPath, content, 'utf8');
console.log('PerShareV1.sol translated to English.');
