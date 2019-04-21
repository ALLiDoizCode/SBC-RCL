const sign = require("ripple-sign-keypairs");
const rippleKeyPairs = require("ripple-keypairs");
const client = require("../Clients/Client")
const CryptoJS = require("crypto-js");
const cc = require("five-bells-condition");
const randomBytes = require('randombytes');

var exports = module.exports = {};


var newWallet = function() {
  const secret = rippleKeyPairs.generateSeed();
  const keypair = rippleKeyPairs.deriveKeypair(secret);
  const address = rippleKeyPairs.deriveAddress(keypair.publicKey);

  var wallet = {
    "secret":secret,
    "address":address
  }

  return wallet
}

var importWallet = function(secret) {

  const keypair = rippleKeyPairs.deriveKeypair(secret);
  const address = rippleKeyPairs.deriveAddress(keypair.publicKey);

  var wallet = {
    "secret":secret,
    "address":address
  }

  return wallet

}

exports.importWallet = importWallet
exports.newWallet = newWallet

/*exports.encryptString = function(secret,password) {

  // Encrypt
  var ciphertext = CryptoJS.AES.encrypt(secret, password);

  return ciphertext

}

exports.decryptString = function(encryptedSecret,password) {
  var address;
  // Decrypt
  var bytes  = CryptoJS.AES.decrypt(encryptedSecret, password);
  try {
    bytes.toString(CryptoJS.enc.Utf8);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    if(IsJsonString(plaintext)) {
      let json = JSON.parse(plaintext);
      address = importWallet(json.master);
      address.regular = json.regular
    }else {
      address = importWallet(plaintext);
    }
  } catch(e) {

      // address = null;
      // address.regular = null

  }
  return address
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}*/

exports.getBells = function() {
  const fulfillment_bytes = randomBytes(32);
  const myFulfillment = new cc.PreimageSha256();
  myFulfillment.setPreimage(fulfillment_bytes);

  var fulfillment = myFulfillment.serializeBinary().toString('hex')
  var condition = myFulfillment.getConditionBinary().toString('hex')

  var bells = {
    "fulfillment":fulfillment,
    "condition":condition
  }

  return bells;
}

exports.getBellsWithPassword = function(str) {
  var currentStr = str
  var currentLength = 32 - str.length
  if(currentLength > 0) {
    for(var i = 0; i < currentLength; i++){
      currentStr = currentStr+"0";
    }
  }
  var buf = Buffer.from(currentStr, 'utf8');
  const fulfillment_bytes = buf;
  const myFulfillment = new cc.PreimageSha256();
  myFulfillment.setPreimage(fulfillment_bytes);

  var fulfillment = myFulfillment.serializeBinary().toString('hex')
  var condition = myFulfillment.getConditionBinary().toString('hex')

  var bells = {
    "fulfillment":fulfillment,
    "condition":condition
  }

  return bells;
}

exports.updateWallet = function (address) {
  client.send(function (obj) {
    let drop = parseFloat(obj.result.account_data.Balance);
    let ownerCount = parseFloat(obj.result.account_data.OwnerCount);
    let xrp = fromDrops(drop);
    var sequence = obj.result.account_data.Sequence
    let flags = obj.result.account_data.Flags;
    sessionStorage.setItem("xrp", xrp);
    sessionStorage.setItem("xrp_Minus_Reserve", xrp - (ownerCount * 5 + 20));
    sessionStorage.setItem("xrp_Owner_Reserve", "" + (ownerCount * 5 + 20));
    sessionStorage.setItem("flags", flags);
    sessionStorage.setItem("sequence", sequence);
  }, client.router.accountInfo,address)
}

var toHex = function(str) {
  return Buffer.from(str, 'utf8').toString('hex').toUpperCase()
}

exports.toHex = toHex

exports.toDollor = function(number) {
  return Number(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

var toDrops = function(value) {
  let drops = parseFloat(value) * 1000000
  return "" + parseInt(drops)
}

var fromDrops = function(value) {
  let xrp = parseFloat(value) / 1000000
  return xrp
}

exports.toDrops = toDrops
exports.fromDrops = fromDrops

exports.signTX = function(tx, secret) {
  var keypair = rippleKeyPairs.deriveKeypair(secret);
  const txJSON = JSON.stringify(tx);
  const txSign = sign(txJSON, keypair);
  return txSign
}

exports.createAmount = function(value, currency, issuer) {
  if (currency == undefined || currency == "") return toDrops(value)

  return {
    "currency": currency,
    "value": value,
    "issuer": issuer
  }
}

exports.createMemo = function(memos) {
  var memoObjects = []
  memos.forEach(function (memo) {
    //console.log(memo);
    var memoObject = {
      "Memo": {
        "MemoType": "",
        "MemoData": toHex(memo)
      }
    }
    memoObjects.push(memoObject);
  });
  return memoObjects
}
