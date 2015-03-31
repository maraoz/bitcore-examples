'use strict';


var bitcore = require('bitcore');
var Address = bitcore.Address;

var a1 = Address.fromString('37Sp6Rv3y4kVd1nQ1JV5pfqXccHNyZm1x3');
var a2 = Address.fromString('1A6ut1tWnUq1SEQLMr4ttDh24wcbJ5o9TT');


console.log(a1.toString(), 'is', a1.type);
console.log(a2.toString(), 'is', a2.type);


var isMultisig = a1.type === Address.PayToScriptHash;
console.log('a1 is multisig?', isMultisig);
