<p align="center">
 <a href="https://www.secureblockchains.com/"><img src="https://github.com/SecureBlockChains/Assets/blob/master/Anchor.png" title="SBC" alt="SBC"></a>
</p>

# SBC-RCL

> A Node.js Library for XRP

### Install

```
Insure you have your SSH keys added to yout github account before installing
```

> npm install -S SecureBlockChains/SBC-RCL

### Examples

> Address Creation

```javascript
const RCL = require('sbc-rcl')

var newWallet = RCL.util.newWallet()
var oldWallet = RCL.util.importWallet("shMyTumyXtbJ75LnzrDi39uJTTBrS")
```

> Balance

```javascript
const RCL = require('sbc-rcl')
RCL.accountInfo(function(obj){
    console.log(obj)
}, "rwtNuwjYS3ykdzF4aq79WGiFPzxpb8TAfv")
```

> Payments

```javascript
const RCL = require('sbc-rcl')

var tx = RCL.transaction.payment("rwtNuwjYS3ykdzF4aq79WGiFPzxpb8TAfv", "rKhGZU6vVDtPLafbZAE6L5DUAwMQR6rYPa", "20", "5000", 5, ["test"])
var blob = RCL.util.signTX(tx,"shMyTumyXtbJ75LnzrDi39uJTTBrS")

RCL.submit(function(obj){
    console.log(obj)
}, blob.signedTransaction)
```

> utility

```javascript
const RCL = require('sbc-rcl')

var drops = RCL.util.toDrops("1.0")
var xrp = RCL.util.fromDrops("1000000")
var blob = RCL.util.signTX(tx,secret)
var amount = RCL.util.createAmount(value, currency, issuer)
var memos = RCL.util.createMemo(["memo text"])
var toHex = RCL.util.toHex("text")
var getBells = RCL.util.getBells()
var bellsFromPassword = RCL.util.getBellsWithPassword("password")
var newWallet = RCL.util.newWallet()
var oldWallet = RCL.util.importWallet("shMyTumyXtbJ75LnzrDi39uJTTBrS")
```

### Methods

```javascript
const RCL = require('sbc-rcl')
RCL.submit(callback, blob)
RCL.accountInfo(callback, address)
RCL.history(callback, address,currentMarker)
```
