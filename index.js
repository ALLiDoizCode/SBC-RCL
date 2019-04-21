const client = require("./Clients/Client")
const ws = require("./Clients/WS-Client")
const util = require("./Helpers/Helper");
const transaction = require("./Models/Payments");
const account = require("./Models/AccountSet");
const dex = require("./Models/Dex");

var exports = module.exports = {};

exports.ws = ws
exports.util = util
exports.transaction = transaction
exports.account = account
exports.dex = dex

exports.submit = function (callback, blob) {
    client.send(callback, client.router.submit, blob)
}

exports.accountInfo = function (callback, address) {
    client.send(callback, client.router.accountInfo, address)
}

exports.history = function (callback, address, currentMarker) {
    var router = client.router.history
    router.endpoint = router.endpoint(address, currentMarker)
    client.send(callback, router, "")
}

/*{ secret: 'snWVTvX1UvobQJf8KXJipth2M4Cx9',
  address: 'rKhGZU6vVDtPLafbZAE6L5DUAwMQR6rYPa' } */

  /*rwtNuwjYS3ykdzF4aq79WGiFPzxpb8TAfv
  shMyTumyXtbJ75LnzrDi39uJTTBrS*/
