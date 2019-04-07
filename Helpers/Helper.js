const sign = require("ripple-sign-keypairs");
require("../Models/Routes")
require("../Clients/Client")

function updateWallet() {
  var address = sessionStorage.getItem("address")
  send(function (obj) {
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
  }, router.accountInfo, {
    "address": address
  })
}

function toHex(str) {
  return Buffer.from(str, 'utf8').toString('hex').toUpperCase()
}

function toDollor(number) {
  return Number(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function toDrops(value) {
  let drops = parseFloat(value) * 1000000
  return "" + parseInt(drops)
}

function sign(tx, keypair) {
  const txJSON = JSON.stringify(tx);
  const txSign = sign(txJSON, keypair);
  console.log(txSign);
  return txSign
}

function submit(callback, tx) {
  var keypair = sessionStorage.getItem("keypair")
  var blob = sign(tx, keypair)
  send(function (obj) {
    if (callback) callback(obj);
  }, router.submit, blob)
}

function createAmount(value, currency, issuer) {
  if (currency == undefined || currency == "") return toDrops(value)

  return {
    "currency": currency,
    "value": value,
    "issuer": issuer
  }
}

function createMemo(memos) {
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

function createPriceEscrowMemo(high, low, highOrLow) {
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

function createTimeEscowMemo(value) {
  let timeMemo = "SBC Memo: This escrow was created within Harbor with a time-based condition. To learn more or to download Harbor visit https://www.secureblockchains.com"
  return timeMemo
}