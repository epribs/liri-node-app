var twitterKeys = require("./keys");
console.log(twitterKeys);
var ck = twitterKeys.twitterKeys.consumer_key;
console.log(ck);
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
    console.log(tweets);
  }
});