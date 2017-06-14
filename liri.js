var fs = require('fs');

var request = require('request');





var twit = function (){
  var twitterKeys = require("./keys");
  var ck = twitterKeys.twitterKeys.consumer_key;
  var cs = twitterKeys.twitterKeys.consumer_secret;
  var atk = twitterKeys.twitterKeys.access_token_key;
  var ats = twitterKeys.twitterKeys.access_token_secret;
  var Twitter = require('twitter');
  var client = new Twitter({
  consumer_key: ck,
  consumer_secret: cs,
  access_token_key: atk,
  access_token_secret: ats
  });
  var params = {screen_name: 'epribs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
    	var ts = tweets
    	console.log(ts.length);
    	for (var i = 0; i < ts.length; i++){
    		console.log("--------\n" + ts[i].created_at.toString() + "\n" + ts[i].text + "\n");
    	}
    }
  });
}



var spot = function() {
  var spotify = require('spotify');
  var nodeArgs = process.argv;
  var songName = "";
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      songName = songName + "+" + nodeArgs[i];
    }
    else {
      songName += nodeArgs[i];
    }
  }
  var queryString = {
  	type: "track"
  }

  queryString.query = songName;
  	spotify.search(queryString, function(err, data) {
      if ( err ) {
          console.log('Error occurred: ' + err);
          return;
      }
      console.log(data);
      // Artist(s)
      console.log("Artist: " + data.tracks.items[0].album.artists[0].name)
  		// The song's name
  		console.log("Song: " + data.tracks.items[0].name)
  		// A preview link of the song from Spotify
  		console.log("Preview: " + data.tracks.items[0].preview_url)
  		// The album that the song is from
  		console.log("Album: " + data.tracks.items[0].album.name)
  });
}


var movie = function() {
  var nodeArgs = process.argv;
  var movieName = "";
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    }
    else {
      movieName += nodeArgs[i];
    }
  }
  var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";
  request(url, function (error, response, data) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', data.Title);
  });
}

var appArg = process.argv[2];

function liri() {
  if (appArg === "do-what-it-says") {
  	fs.readFile("random.txt", "utf8", function(err, data) {
  		if ( err ) {
          console.log('Error occurred: ' + err);
          return;
      }
  		data = data.split(",");
  		var appArg = data[0];
  		var nodeArgs = data[1];

      process.argv.splice(2,2);
      process.argv.push(appArg);
      process.argv.push(nodeArgs);
  spot();

  	});
  	
  } else {
  	if (appArg === "my-tweets") {
  		twit();
  	} else if (appArg === "spotify-this-song") {
  		spot();
  	} else if (appArg === "movie-this") {
  		movie();
  	} 
  }
}
liri();









