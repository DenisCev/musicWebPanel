function ListsSongsGen(response){

	for(var i = 0; i < response.data.length; i++)
	{
		document.getElementById('accordionSongs').innerHTML += 
		"<div class='panel panel-default'> <div class=panel-heading role=tab id=headingSong"+i+
		"><h4 class=panel-title><span class=badge>"+response.data[i].songs.length+"</span><a style=padding-left:3%; role=button data-toggle=collapse data-parent=#accordion href=#collapseSong"+i+
		" aria-expanded=true aria-controls=collapseSong"+i+
		">"+response.data[i].name+
		"</a>"+ShowDeleteList(response, i) +"</h4></div><div id=collapseSong"+i+
		" class='panel-collapse collapse' role=tabpanel aria-labelledby=headingSong"+i+
		"><div id=group2 class=panel-body>"+AllSongs(response, i)+"</div></div></div>";  		
	}
}

function ListsGen(response){

	for(var i = 0; i < response.data.length; i++)
	{
		document.getElementById('accordion').innerHTML += 
		"<div class='panel panel-default'> <div class=panel-heading role=tab id=heading"+i+
		"><h4 class=panel-title><span class=badge>"+response.data[i].songs.length+"</span><a style=padding-left:3%; role=button data-toggle=collapse data-parent=#accordion href=#collapse"+i+
		" aria-expanded=true aria-controls=collapse"+i+
		">"+response.data[i].name+
		"</a>"+ShowDeleteList(response, i) +"</h4></div><div id=collapse"+i+
		" class='panel-collapse collapse' role=tabpanel aria-labelledby=heading"+i+
		"><div id=group class=panel-body>"+SongsOfList(response, i)+"</div></div></div>";  		
	}
}

function SongsOfList(response, i){

	var songs = response.data[i].songs;
	var htmlString = "";
	for(var j = 0; j < songs.length; j++)
	{
		htmlString = htmlString + "<div class=list-group><a onclick='upReproductions("+ songs[j].id+");refresh();' target=_blank href="+songs[j].urlSong+
		" class='list-group-item'><h4 class=list-group-item-heading>"+songs[j].name+
		"</h4><p class=list-group-item-text> Artista: "+songs[j].artist+
		"</p><p class=list-group-item-text> Reproducciones: "+songs[j].reproductions+
		"</p></a>"+ShowDeleteSong(response, i, j)+"</div>";
	}
	return htmlString;
}

function AllSongs(response, i){

	var songs = response.data[i].songs;
	var htmlString = "";
	for(var j = 0; j < songs.length; j++)
	{
		htmlString = htmlString + "<div class=list-group><a onclick='upReproductions("+ songs[j].id+");refresh();' target=_blank href="+songs[j].urlSong+
		" class='list-group-item'><h4 class=list-group-item-heading>"+songs[j].name+
		"</h4><p class=list-group-item-text> Artista: "+songs[j].artist+
		"</p><p class=list-group-item-text> Reproducciones: "+songs[j].reproductions+
		"</p></a>"+ShowAddSong(response, i, j)+"</div>";
	}
	return htmlString;
}

function ShowDeleteList(response, i){
	var list = response.data[i];
	var htmlString = "";
	if(list.editable == 1){
		htmlString = htmlString + "<button type=button class=close aria-label=Close onclick=DeleteList("+list.id+")><span id=list_"+list.id+" aria-hidden=true>&times;</span></button>";
	}
	else{htmlString = ""}
	return htmlString;
}

function ShowAddSong(response, i, j){
	
	var list = response.data[i];
	var htmlString = "";
	htmlString = htmlString + "<button class='btn btn-default' id=song_"+list.songs[j].id+" onclick=ShowModalSong("+list.songs[j].id+")>Añadir a una lista</button>";
	return htmlString;
}

function ShowModalSong(id_song){
	$('#myModal').modal('show');
    $('#myModalLabel').text("Añade la cancion a una lista");
    var responseList = JSON.parse(localStorage.getItem('dataLists'));

    for(var i = 0; i < responseList.data.length; i++)
	{
    	document.getElementById('modalList').innerHTML += "<a href=# class=list-group-item onclick=AddToList("+id_song+","+responseList.data[i].id+")><span class=badge>"+responseList.data[i].songs.length+"</span>"+ responseList.data[i].name +"</a>";
	}	
}

function ShowDeleteSong(response, i, j){

	var list = response.data[i];
	var htmlString = "";
	htmlString = htmlString + "<button id=song_"+list.songs[j].id+" type=button class=close aria-label=Close onclick=DeleteSong("+list.songs[j].id+","+list.id+")><span aria-hidden=true>&times;</span></button>";

	return htmlString;
}

function DeleteList(id) {
	ShowModal("¿Estas seguro de querer eliminar la lista?", "Una vez borrada no podras recuperar la informacion")
	$('#buttonModal').click( function () {
		DeleteListRequest(id);
    });
}

function DeleteSong(id_song, id_list) {
	ShowModal("¿Estas seguro de querer eliminar la cancion?", "Una vez borrada no aparecera mas en la lista")
	$('#buttonModal').click( function () {
		DeleteSongRequest(id_song, id_list);
    });
}

function ShowModal(header, message){
	$('#myModal').modal('show');
    $('#myModalLabel').text(header);
    $('#myModalbody').text(message);
}