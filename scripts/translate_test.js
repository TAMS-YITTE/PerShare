const fs = require('fs');
const path = require('path');

const testPath = path.join(__dirname, '../test/PerShare.test.js');
let content = fs.readFileSync(testPath, 'utf8');

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

fs.writeFileSync(testPath, content, 'utf8');
console.log('PerShare.test.js translated to English.');
