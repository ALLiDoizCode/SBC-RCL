var LOCAL_SERVER = "http://localhost:8080/RCL/"
var DATA_SERVER = "https://data.ripple.com/v2/"
var PROD_SERVER = "Production server"
var SERVER = LOCAL_SERVER
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var exports = module.exports = {};

var router = 
{
    submit:{
        endpoint:"submit/",
        method:"POST",
        server:SERVER
    },
    accountInfo:{
        endpoint:"accountInfo/",
        method:"POST",
        server:SERVER
    },
    history:{
        endpoint:function(address,currentMarker) {
            return "accounts/"+address+"/balance_changes?descending=true&limit=100&marker="+currentMarker
        },
        method:"GET",
        server:DATA_SERVER
    }
}

exports.router = router

exports.send = function(callback,currentRouter,param) {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(xhttp.responseText);
            if (callback) callback(json,this.status);
        } else {
            let json = JSON.parse(xhttp.responseText);
            if (callback) callback(json,this.status);
        }
    };
    var param = param
    param = encodeURI(param)
    xhttp.open(currentRouter.method,currentRouter.server+currentRouter.endpoint+param, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}