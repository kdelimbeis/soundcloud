SC.initialize({
	client_id: 'f665fc458615b821cdf1a26b6d1657f6'
})


var audio = document.getElementsByClassName("music")[0]
var myobj


document.getElementById("submit").addEventListener("click",function(){
	var searchterm = document.getElementById("searchterm").value;

	SC.get('/tracks', {
	  q: searchterm
	}).then(function(tracks) {
	  console.log(tracks);
	  myobj = {tracks}

	  var template = `
  {{#tracks}}
  	<div>
	  	<div>{{user.username}}</div>
	  	<div class="id">{{id}}</div>
	  	<div>{{title}}</div>
	  	<div><a href='{{permalink_url}}'>Visit us on SoundCloud</a></div>
	  	<div>{{genre}}</div>
	  	
	  	<br>
  	</div>
  {{/tracks}}
`

var list = document.getElementById("list")
list.innerHTML = Mustache.render(template, myobj)


var ids = document.getElementsByClassName("id");
for (var i = 0; i < ids.length; i++) {
	ids[i].addEventListener("click",function(event){
		song = event.target.innerHTML;
		jukebox.playSong(song);
	})
}

});
});


class Jukebox{
	constructor(name){
		this.name = name
	}

	playSong (song) {
		SC.stream("/tracks/" + song).then(function(sound) {
			console.log(sound)
			SC.sound = sound;
			SC.sound.play();
		})
	}

	pauseSong () {
		SC.sound.pause();
	}

}

var jukebox = new Jukebox("classroom");



document.getElementById("button1").addEventListener("click", function(){
	jukebox.playSong(song);
	})


document.getElementById("button2").addEventListener("click", function(){
	jukebox.pauseSong()
	});


document.getElementById("button6").addEventListener("click", function(){
	trackId = 315307209;
	findSong(trackId);
	});
document.getElementById("button7").addEventListener("click", function(){
	trackId = 216847995;
	findSong(trackId);
	});
document.getElementById("button8").addEventListener("click", function(){
	trackId = 239777850;
	findSong(trackId);
	});



function findSong(trackId) {
	SC.get("/tracks/" + trackId).then(function(response) {
		console.log(response);
		console.log(response.user.username);
		console.log(response.id);
		console.log(response.permalink_url);
		console.log(response.title);
		console.log(response.uri);
		console.log(response.description);
		console.log(response.genre);
		document.getElementById("artist").innerHTML=(response.user.username);
		document.getElementById("response.id").innerHTML=(response.id);
		document.getElementById("title").innerHTML=(response.title);
		document.getElementById("link").innerHTML="<a href='" + response.permalink_url + "'>Visit us on SoundCloud</a>";
		document.getElementById("genre").innerHTML=(response.genre);
		document.getElementById("description").innerHTML=(response.description);

		$("#img").attr("src",response.artwork_url);
		

	})
	};


