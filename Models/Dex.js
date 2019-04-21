var transaction = require("./Transactions");
var exports = module.exports = {};

exports.offerCreate = function (account, fee, sequence,gets, pays, flag) {
  var tx = transaction.baseTX("OfferCreate", account, fee, sequence)
  tx.TakerGets = gets
  tx.TakerPays = pays
  if (flag != null) {
    tx.Flags = flag
  }
  return tx
}

exports.offerCancel = function (account, fee, sequence,offerSequence) {
  var tx = transaction.baseTX("OfferCancel", account, fee, sequence)
  tx.OfferSequence = offerSequence
  return tx
}