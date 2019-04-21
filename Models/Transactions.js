var exports = module.exports = {};

exports.baseTX = function(transactionType, account, fee, sequence) {
    var tx = {
        "Account": address,
        "TransactionType": transactionType,
        "Fee": fee,
        "Sequence": sequence
    }

    return tx
}
