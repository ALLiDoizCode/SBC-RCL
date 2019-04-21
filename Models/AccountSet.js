const transaction = require("./Transactions");

var exports = module.exports = {};

exports.accountSet = function(setType, flag) {
    var tx = transaction.baseTX("AccountSet")
    if (setType == 'ClearFlag') {
        tx.ClearFlag = flag;
    } else {
        tx.SetFlag = flag;
    }
    return tx
}

exports.setRegularKey = function(regularKey) {
    var tx = transaction.baseTX("AccountSet")
    if (regularKey != null && regularKey != "") {
        tx.RegularKey = regularKey;
    }
    return tx
}

exports.setTrust = function(noRipple, token) {
    var tx = transaction.baseTX("TrustSet")
    tx.LimitAmount = token
    if (noRipple == false) {
        tx.Flags = 131072;
    }
    return tx
}

exports.depositPreauth = function(address) {
    var tx = transaction.baseTX("DepositPreauth")
    tx.Authorize = address
    return tx
}