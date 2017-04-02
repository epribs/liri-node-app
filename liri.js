var twitterKeys = require("./keys");
console.log(twitterKeys);
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


var spotify = require('spotify');
 
spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    console.log(data);
});

