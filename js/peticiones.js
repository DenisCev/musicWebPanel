function Register() {
  
  var name = document.getElementById('nameRes').value;
  var pass = document.getElementById('passRes').value;
  var email = document.getElementById('emailRes').value;

  var params = "name=" + name + "&email=" + email + "&pass=" + pass;
  if(name != "" && pass != "" && email != "")
  {
  connection = CreateRequest();
var url = "http://localhost/APIMusic/public/index.php/user/create.json";
  connection.onreadystatechange = response;
  
 
  connection.open('POST', url);
  connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  connection.send(params);
  }
  else
    {ShowModal("Error: " + 400, "No pueden haber campos vacios")}
}

function AddToList(id_song, id_list) {

	var params = "id_song=" + id_song + "&id_list=" + id_list;
	
  connection = CreateRequest();
var url = "http://localhost/APIMusic/public/index.php/list/add.json";
  connection.onreadystatechange = response;
  
 
  connection.open('POST', url);
  connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if(localStorage.getItem("token") != null){
        connection.setRequestHeader('Authorization', localStorage.getItem("token"));
    }
  connection.send(params);
}

function response() {
  if(connection.readyState == 4) {
  	var response = JSON.parse(connection.responseText);
  	console.log(response);
  	if (response.code == '200') {
  		if(response.data.token != null){
  			localStorage.setItem("token", response.data.token);
  		}

  		if(response.data.rol != null){
  			localStorage.setItem("rol", response.data.rol);
  		}

  		if(response.message == "Listas obtenidas"){
  			localStorage.setItem("dataLists", JSON.stringify(response));
  			localStorage.setItem("token",localStorage.getItem('token'));
  			ListsGen(response);
  			GetSongs();
  		}

  		if(response.message == "Canciones obtenidas" && localStorage.getItem('rol') == "standard"){

  			localStorage.setItem("token", localStorage.getItem('token'));
  			ListsSongsGen(response);
  		}

  		if(response.message == "Lista creada"){
  			ShowModal("Exito", "Lista creada");
  		}

      if(response.message == "Cancion eliminada de la lista" && localStorage.getItem('rol') == "admin"){

        DeleteSongFromDB(response.data);
      }

      if(response.message == "Cancion borrada" && localStorage.getItem('rol') == "admin"){
          refresh();
      }

		  if(window.location.href == "http://localhost/Web_music/" || window.location.href == "http://localhost/Web_music/index.html"){
        if(response.message == "Usuario creado con exito"){
          ShowModal("Enhorabuena", "Te has registrado con exito")
        }
        else
        {
          window.location.href = "http://localhost/Web_music/panel.html";
        }
  		}
  	}
  	if (response.code == '400') {
    	ShowModal("Error: " + response.code, response.message)
  	}
  	
  }
}

function GetSongs() {

  connection = CreateRequest();
 var url = "http://localhost/APIMusic/public/index.php/list/songs.json";
  connection.onreadystatechange = response;
 
  connection.open('GET', url);
  connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  if(localStorage.getItem('token') != null){
        connection.setRequestHeader('Authorization', localStorage.getItem('token'));
    }
  connection.send();
}

function Login() {
  var userName = document.getElementById('name').value;
  var password = document.getElementById('pass').value;
  
  connection = CreateRequest();
 
  connection.onreadystatechange = response;
  var url = "http://localhost/APIMusic/public/index.php/user/login.json?" + 'name=' + userName + '&pass=' + password;
 
  connection.open('GET', url);
  connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  connection.send();
}

function GetLists() {

  connection = CreateRequest();
 
  connection.onreadystatechange = response;
  var url = "http://localhost/APIMusic/public/index.php/list/lists.json";
 
  connection.open('GET', url);
  connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  if(localStorage.getItem('token') != null){
        connection.setRequestHeader('Authorization', localStorage.getItem('token'));
    }
  connection.send();
}

function DeleteListRequest(id) {
  var params = "id=" + id;
	
  connection = CreateRequest();

  connection.onreadystatechange = response;
  var url = "http://localhost/APIMusic/public/index.php/list/delete.json";
 
  connection.open('POST', url);
  connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if(localStorage.getItem("token") != null){
        connection.setRequestHeader('Authorization', localStorage.getItem("token"));
    }
  connection.send(params);
}

function upReproductions(id) {
  var params = "id=" + id;
	
  connection = CreateRequest();

  connection.onreadystatechange = response;
  var url = "http://localhost/APIMusic/public/index.php/song/upReproductions.json";
 
  connection.open('POST', url);
  connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if(localStorage.getItem("token") != null){
        connection.setRequestHeader('Authorization', localStorage.getItem("token"));
    }
  connection.send(params);
}

function DeleteSongRequest(id_song, id_list) {
  var params = "id_song=" + id_song + "&id_list=" + id_list;
	
  connection = CreateRequest();

  connection.onreadystatechange = response;
  var url = "http://localhost/APIMusic/public/index.php/list/removeFromList.json";
 
  connection.open('POST', url);
  connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  if(localStorage.getItem("token") != null){
        connection.setRequestHeader('Authorization', localStorage.getItem("token"));
   }
  connection.send(params);
}

function DeleteSongFromDB(id) {
  var params = "id=" + id;
  
  connection = CreateRequest();

  connection.onreadystatechange = response;
  var url = "http://localhost/APIMusic/public/index.php/song/delete.json";
 
  connection.open('POST', url);
  connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  if(localStorage.getItem("token") != null){
        connection.setRequestHeader('Authorization', localStorage.getItem("token"));
   }
  connection.send(params);
}

function CreateSong() {

  var name = document.getElementById('name').value;
  var artist = document.getElementById('artist').value;
  var urlSong = document.getElementById('urlSong').value;

  if(name != "" && artist != "" && urlSong != "" )
  {
  	var params = "name=" + name + "&artist=" + artist + "&urlSong=" + urlSong + "&reproductions=0";
	
  connection = CreateRequest();

  connection.onreadystatechange = response;
  var url = "http://localhost/APIMusic/public/index.php/song/create.json";
 
  connection.open('POST', url);
  connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if(localStorage.getItem("token") != null){
        connection.setRequestHeader('Authorization', localStorage.getItem("token"));
    }
  connection.send(params);
  }
  else
  	{alert("No pueden haber campos vacios");}
  
}

function CreateList() {

  var name = document.getElementById('name').value;

  if(name != "")
  {
  	var params = "name=" + name;
	
  connection = CreateRequest();
var url = "http://localhost/APIMusic/public/index.php/list/create.json";
  connection.onreadystatechange = response;
  
 
  connection.open('POST', url);
  connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if(localStorage.getItem("token") != null){
        connection.setRequestHeader('Authorization', localStorage.getItem("token"));
    }
  connection.send(params);

  }
  else
  	{ShowModal("Error: " + 400, "No pueden haber campos vacios")}
  
}

function CreateRequest()
{
	if(window.XMLHttpRequest) {
	    connection = new XMLHttpRequest();
	}
	else if(window.ActiveXObject) {
	    connection = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return connection;
}