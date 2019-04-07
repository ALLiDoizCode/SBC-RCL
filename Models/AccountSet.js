require("./Transactions");
require("../Helpers/Helper");

function accountSet(setType, flag) {
    var tx = baseTX("AccountSet")
    if (setType == 'ClearFlag') {
        tx.ClearFlag = flag;
    } else {
        tx.SetFlag = flag;
    }
    return tx
}

function setRegularKey() {
    var tx = baseTX("AccountSet")
    if (regularKey != null && regularKey != "") {
        tx.RegularKey = regularKey;
    }
    return tx
}

function setTrust(noRipple, token) {
    var tx = baseTX("TrustSet")
    tx.LimitAmount = token
    if (noRipple == false) {
        tx.Flags = 131072;
    }
    return tx
}

function depositPreauth(address) {
    var tx = baseTX("DepositPreauth")
    tx.Authorize = address
    return tx
}