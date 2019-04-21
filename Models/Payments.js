var transaction = require("./Transactions");
var util = require("../Helpers/Helper");

var exports = module.exports = {};

var payment = function (account, destination, amount, fee, sequence, memos, destinationTag, invoiceID) {
    var tx = transaction.baseTX("Payment", account, fee, sequence)
    tx.Destination = destination 
    tx.Amount = util.toDrops(amount)
    if (destinationTag != undefined) {
        tx.DestinationTag
    }

    if (invoiceID != undefined) {
        tx.InvoiceID = invoiceID
    }

    if (memos != undefined) {
        tx.Memos = util.createMemo(memos)
    }

    return tx
}

exports.payment = payment

exports.escrowCreate = function (account, destination, amount, fee, sequence, memos, destinationTag, invoiceID) {
    var tx = payment(account, destination, amount, fee, sequence, memos, destinationTag, invoiceID)
    tx.TransactionType = "EscrowCreate"
    if (finishAfter != undefined) {
        tx.FinishAfter = finishAfter - 946684800
    }

    if (cancelAfter != undefined) {
        tx.CancelAfter = cancelAfter - 946684800
    }

    if (condition != undefined) {
        tx.Condition = condition.toUpperCase();
    }

    if (finishAfter == undefined) {
        var d = new Date();
        var n = (d.getTime() / 1000) + 300;

        tx.FinishAfter = parseInt(n) - 946684800
    }
    return tx
}

exports.escrowFinish = function (owner, account, fee, sequence,offerSequence) {
    var tx = transaction.baseTX("EscrowFinish", account, fee, sequence)
    tx.Owner = owner
    tx.OfferSequence = offerSequence

    if (condition != null) {
        tx.Condition = condition.toUpperCase();
    }

    if (fulfillment != null) {
        tx.Fulfillment = fulfillment.toUpperCase();
    }

    if (memos != undefined) {
        tx.Memos = util.createMemo(memos)
    }
    return tx
}

exports.escrowCancel = function (owner, account, fee, sequence, offerSequence) {
    var tx = transaction.baseTX("EscrowCancel", account, fee, sequence)
    tx.Owner = owner
    tx.OfferSequence = offerSequence
    if (memos != undefined) {
        tx.Memos = util.createMemo(memos)
    }
    return tx
}