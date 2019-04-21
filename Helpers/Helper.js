const sign = require("ripple-sign-keypairs");
var rippleKeyPairs = require("ripple-keypairs");
const client = require("../Clients/Client")

var exports = module.exports = {};


exports.NewWallet = function() {
  const secret = rippleKeyPairs.generateSeed();
  const keypair = rippleKeyPairs.deriveKeypair(secret);
  const address = rippleKeyPairs.deriveAddress(keypair.publicKey);

  var wallet = {
    "secret":secret,
    "address":address
  }

  return wallet
}

exports.walletFromSecret = function(secret) {

  const keypair = rippleKeyPairs.deriveKeypair(secret);
  const address = rippleKeyPairs.deriveAddress(keypair.publicKey);

  var wallet = {
    "secret":secret,
    "address":address
  }

  return wallet

}

exports.updateWallet = function (address) {
  client.send(function (obj) {
    let drop = parseFloat(obj.result.account_data.Balance);
    let ownerCount = parseFloat(obj.result.account_data.OwnerCount);
    let xrp = drop / 1000000;
    var sequence = obj.result.account_data.Sequence
    let flags = obj.result.account_data.Flags;
    sessionStorage.setItem("xrp", xrp);
    sessionStorage.setItem("xrp_Minus_Reserve", xrp - (ownerCount * 5 + 20));
    sessionStorage.setItem("xrp_Owner_Reserve", "" + (ownerCount * 5 + 20));
    sessionStorage.setItem("flags", flags);
    sessionStorage.setItem("sequence", sequence);
  }, client.router.accountInfo,address)
}

exports.toHex = function(str) {
  return Buffer.from(str, 'utf8').toString('hex').toUpperCase()
}

exports.toDollor = function(number) {
  return Number(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

var toDrops = function(value) {
  let drops = parseFloat(value) * 1000000
  return "" + parseInt(drops)
}

exports.toDrops = toDrops

exports.signTX = function(tx, secret) {
  var keypair = rippleKeyPairs.deriveKeypair(secret);
  const txJSON = JSON.stringify(tx);
  const txSign = sign(txJSON, keypair);
  console.log(txSign);
  return txSign
}

exports.submit = function(callback, blob) {
  client.send(callback,client.router.submit, blob)
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

exports.createPriceEscrowMemo = function(high, low, highOrLow) {
  var priceMemo;
  if (highOrLow === "high") {
    priceMemo = "SBC Memo: This escrow was created within Harbor with a price-based condition. The user has locked this XRP in escrow until the price reaches $" + toDollor(high) + "/XRP. To learn more or to download Harbor visit https://www.secureblockchains.com"
  } else if (highOrLow === "low") {
    priceMemo = "SBC Memo: This escrow was created within Harbor with a price-based condition. The user has locked this XRP in escrow until the price falls below $" + toDollor(low) + "/XRP. To learn more or to download Harbor visit https://www.secureblockchains.com"
  } else if (highOrLow === "both") {
    priceMemo = "SBC Memo: This escrow was created within Harbor with a price-based condition. The user has locked this XRP in escrow until the price reaches $" + toDollor(high) + "/XRP or falls below $" + toDollor(low) + "/XRP. To learn more or to download Harbor visit https://www.secureblockchains.com"
  }
  return priceMemo
}

exports.createTimeEscowMemo = function(value) {
  let timeMemo = "SBC Memo: This escrow was created within Harbor with a time-based condition. To learn more or to download Harbor visit https://www.secureblockchains.com"
  return timeMemo
}