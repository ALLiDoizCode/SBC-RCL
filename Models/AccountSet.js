const transaction = require("./Transactions");

var exports = module.exports = {};

exports.accountSet = function(setType, account, fee, sequence, flag) {
    var tx = transaction.baseTX("AccountSet", account, fee, sequence)
    if (setType == 'ClearFlag') {
        tx.ClearFlag = flag;
    } else {
        tx.SetFlag = flag;
    }
    return tx
}

exports.setRegularKey = function(regularKey, account, fee, sequence) {
    var tx = transaction.baseTX("AccountSet", account, fee, sequence)
    if (regularKey != null && regularKey != "") {
        tx.RegularKey = regularKey;
    }
    return tx
}

exports.setTrust = function(noRipple, account, fee, sequence, token) {
    var tx = transaction.baseTX("TrustSet", account, fee, sequence)
    tx.LimitAmount = token
    if (noRipple == false) {
        tx.Flags = 131072;
    }
    return tx
}

exports.depositPreauth = function(address, account, fee, sequence) {
    var tx = transaction.baseTX("DepositPreauth", account, fee, sequence)
    tx.Authorize = address
    return tx
}