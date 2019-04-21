var util = require("../Helpers/Helper");

var exports = module.exports = {};

var startSocket = function(address) {
    let channel = {
        "command": "subscribe",
        "accounts":[address]
      }

    if ("WebSocket" in window) {
        // Let us open a web socket
        var ws = new WebSocket(WS);
        ws.onopen = function () {
            // Web Socket is connected, send data using send()
            ws.send(JSON.stringify(channel));
        };
    
        ws.onmessage = function (evt) {
            var received_msg = evt.data;
            var parsedData = JSON.parse(received_msg);
       
            if (parsedData.transaction != null) {
                util.updateWallet(address)
            } 
        };
    
        ws.onclose = function () {
            // websocket is closed.
            alert("Connection is closed...");
        };
    
        window.onbeforeunload = function (event) {
            socket.close();
        };
    } else {
        // The browser doesn't support WebSocket
        alert("WebSocket NOT supported by your Browser!");
    }
}

exports.startSocket = startSocket