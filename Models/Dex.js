require("./Transactions");
require("../Helpers/Helper");

function offerCreate(gets, pays, flag) {
  var tx = baseTX("OfferCreate")
  tx.TakerGets = gets
  tx.TakerPays = pays
  if (flag != null) {
    tx.Flags = flag
  }
  return tx
}

function offerCancel(offerSequence) {
  var tx = baseTX("OfferCancel")
  tx.OfferSequence = offerSequence
  return tx
}