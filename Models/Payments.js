require("./Transactions");
require("../Helpers/Helper");

function payment(destination, amount, destinationTag, invoiceID, memos) {
    var tx = baseTX("Payment")
    tx.Destination = destination
    tx.Amount = amount
    if (destinationTag != undefined) {
        tx.DestinationTag
    }

    if (invoiceID != undefined) {
        tx.InvoiceID = invoiceID
    }

    if (memos != undefined) {
        tx.Memos = createMemo(memos)
    }

    return tx
}

function escrowCreate(destination, amount, destinationTag, invoiceID, memos) {
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

function escrowFinish(owner,offerSequence) {
    var tx = baseTX("EscrowFinish")
    tx.Owner = owner
    tx.OfferSequence = offerSequence

    if (condition != null) {
        tx.Condition = condition.toUpperCase();
    }

    if (fulfillment != null) {
        tx.Fulfillment = fulfillment.toUpperCase();
    }

    if (memos != undefined) {
        tx.Memos = createMemo(memos)
    }
    return tx
}

function escrowCancel(owner,offerSequence) {
    var tx = baseTX("EscrowCancel")
    tx.Owner = owner
    tx.OfferSequence = offerSequence
    if (memos != undefined) {
        tx.Memos = createMemo(memos)
    }
    return tx
}