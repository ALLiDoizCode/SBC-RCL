var transaction = require("./Transactions");
var exports = module.exports = {};

exports.offerCreate = function (gets, pays, flag) {
  var tx = transaction.baseTX("OfferCreate")
  tx.TakerGets = gets
  tx.TakerPays = pays
  if (flag != null) {
    tx.Flags = flag
  }
  return tx
}

exports.offerCancel = function (offerSequence) {
  var tx = transaction.baseTX("OfferCancel")
  tx.OfferSequence = offerSequence
  return tx
}