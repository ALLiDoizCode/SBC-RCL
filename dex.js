const sign = require("ripple-sign-keypairs");

function signOfferCreate(sequence,gets,pays,flag) {
    let tx = {
      "Account": address,
      "TakerGets":gets,
      "TakerPays":pays,
      "TransactionType": "OfferCreate",
      "Sequence":sequence,
      "Fee":fee.value,
    }
    if(flag != null) {
      tx.Flags = flag
    }
    const txJSON = JSON.stringify(tx);
    console.log(txJSON);
    const txSign = sign(txJSON, keypair);
    return txSign;
  
  }

  function signOfferCancel(sequence,offerSequence) {
    let tx = {
      "Account": address,
      "OfferSequence":offerSequence,
      "TransactionType": "OfferCancel",
      "Sequence":sequence,
      "Fee":fee.value,
    }
  
    const txJSON = JSON.stringify(tx);
    const txSign = sign(txJSON, keypair);
    return txSign
  }