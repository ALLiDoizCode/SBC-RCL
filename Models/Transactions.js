function baseTX(transactionType, account, fee, sequence) {
    var tx = {
        "Account": sessionStorage.getItem("address"),
        "TransactionType": transactionType,
        "Fee": sessionStorage.getItem("Fee"),
        "Sequence": sessionStorage.getItem("Sequence")
    }

    if (account != undefined) {
        tx.Account = account
    }
    if (fee != undefined) {
        tx.Fee = fee
    }
    if (sequence != undefined) {
        tx.Sequence = sequence
    }

    return tx
}
