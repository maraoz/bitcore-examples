'use strict';

// example from: https://labs.bitpay.com/t/generating-and-checking-p2sh-signatures

var bitcore = require('bitcore');
var PrivateKey = bitcore.PrivateKey;
var Script = bitcore.Script;
var Transaction = bitcore.Transaction;
var Signature = Transaction.Signature;

// 1. Generate two key pairs (sk_A, pk_A) and (sk_B, pk_B)
var a = new PrivateKey();
var b = new PrivateKey();

console.log('a', a.toString());
console.log('b', b.toString());

// 2. Create S = a P2SH 2-2 multisig scriptPubKey for pk_A, pk_B
var pubA = a.publicKey;
var pubB = b.publicKey;
var pubKeys = [pubA, pubB];
var redeemScript = Script.buildMultisigOut(pubKeys, 2);
console.log('redeemScript', redeemScript.toString());
var s = redeemScript.toScriptHashOut();
console.log('s', s.toString());

// 3. Create T = a transaction which has one input, spending an outpoint with scriptPubKey = S, and no outputs.
var output = {
  outputIndex: 0,
  txId: '7124ec668432ece83eeff9be8d2a3fa7f0ad06964ec2828c433087c7dfb65e69',
  script: s,
  amount: 0.1,
};
console.log('fake output', output);
var t = new Transaction()
  .from(output, pubKeys, 2)
  .to('1BJ1QeJkmmeByuRRjrft9HjHa3xv7aFbQB', 0.1); // some random address
console.log('t', t);

// 4. Create a signature sig_A for T using sk_A with hash type single, likewise sig_B.

var sig_a = t.getSignatures(a, Signature.SIGHASH_SINGLE);
var sig_b = t.getSignatures(b, Signature.SIGHASH_SINGLE);
console.log('sig_a', sig_a);
console.log('sig_b', sig_b);

