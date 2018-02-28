
$(document).ready( function () {
    //var urlBase = "http://h2744356.stratoserver.net/denis/APIMusic/public/index.php/";
    var urlBase = "http://localhost/APIMusic/public/index.php/";
    /*$('#form_login').submit( function () {
        var formdata = $(this).serialize();
        $.ajax({
            type: "GET",
            url: urlBase + "user/login.json",
            data: formdata,
            dataType: 'json',
            success: function(response) {
                console.log(response);
            }
         });
        return false; 
    });*/

    //$('#form_login').submit(function () {login()});
});

function login(){
    
    var urlBase = "http://localhost/APIMusic/public/index.php/";
    var ajax_url = "user/login.json";

    var userLog = document.getElementById("name").value;
    var passLog = document.getElementById("pass").value;

    window.localStorage.setItem('name', userLog);
    var params = "?name=" + userLog + "&pass=" + passLog;

    var ajax_request = new XMLHttpRequest();

    ajax_request.onreadystatechange = function() {
    
        if (ajax_request.readyState == 4 ) {

            var jsonObj = JSON.parse(ajax_request.responseText);
            console.log(jsonObj);
            var data = jsonObj['data'];
            var token = data['token'];
            window.localStorage.setItem('token', token);
            if(jsonObj.code == 200){
                alert('trace');
            }
        }
    }

    ajax_request.open("GET", urlBase + ajax_url + params, true);
    setHeader(ajax_request);
    ajax_request.send(); 
}

function setHeader(ajax_request){
    ajax_request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    if(window.localStorage.getItem('token') != null){
        ajax_request.setRequestHeader('Authorization', window.localStorage.getItem('token'));
    }
}