var LOCAL_SERVER = "http://localhost:8080/"
var PROD_SERVER = ""
var TEST_SERVER = ""
var SERVER = LOCAL_SERVER

var router = 
{
    submit:{
        endpoint:"RCL/submit/",
        method:"POST"
    },
    accountInfo:{
        endpoint:"RCL/accountInfo/",
        method:"POST"
    },
    accountObjects:{
        endpoint:"RCL/accountObjects/",
        method:"POST"
    }
}

function send(callback,currentRouter,json) {
    var xhttp = new XMLHttpRequest();
    var token = sessionStorage.getItem('token');
    xhttp.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(xhttp.responseText);
            if (callback) callback(this.responseText,this.status);
        } else {
            if (callback) callback(this.responseText,this.status);
            let json = JSON.parse(xhttp.responseText);
            console.log(json.reason)
        }
    };
    xhttp.open(currentRouter.method,SERVER+currentRouter.endpoint, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    if(json == undefined){
        xhttp.send();
    }else{
        xhttp.send(JSON.stringify(json));
    }
}