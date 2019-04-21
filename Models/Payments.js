var transaction = require("./Transactions");
var util = require("../Helpers/Helper");

var exports = module.exports = {};

var payment = function (destination, amount, destinationTag, invoiceID, memos) {
    var tx = transaction.baseTX("Payment")
    tx.Destination = destination
    tx.Amount = amount
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

exports.escrowCreate = function (destination, amount, destinationTag, invoiceID, memos) {
    var tx = payment(destination, amount, destinationTag, invoiceID, memos)
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

exports.escrowFinish = function (owner, offerSequence) {
    var tx = transaction.baseTX("EscrowFinish")
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

exports.escrowCancel = function (owner, offerSequence) {
    var tx = transaction.baseTX("EscrowCancel")
    tx.Owner = owner
    tx.OfferSequence = offerSequence
    if (memos != undefined) {
        tx.Memos = util.createMemo(memos)
    }
    return tx
}