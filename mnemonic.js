'use strict';

// NodeJS example for bitcore-mnemonic

var bitcore = require('bitcore');
var Mnemonic = require('bitcore-mnemonic');

var m = new Mnemonic();
var pubKey = m.toHDPrivateKey().publicKey;
var address = bitcore.Address.fromPublicKey(pubKey);


console.log(address.toString());
