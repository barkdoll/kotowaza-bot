console.log('Bot started...');

// Requirements
const Twit = require('twit');
const TwitterBot = require('node-twitterbot').TwitterBot;

const data = require('./kotowaza.json');

// Setup for config variables in Heroku
const Bot = new TwitterBot({
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

// The main funcion that returns a random proverb
function getWisdom() {
   // function to generate random number out of array index
   function pickTweet(arr) {
      let randomNumber = Math.floor(Math.random() * arr.length);
      return arr[randomNumber];
   }

   let chosen = pickTweet(data);

   let kotowaza = `【${chosen[0]}】${chosen[1]}`;
   let imi = chosen[2].split(/\n\n/)[1];

   let post = `${kotowaza}\n${imi}`;

   if (post.length > 140) {
       post = `${post.substr(0, 137)}…`;
   }

   return post;
}

function tweetIt() {
   let tweet = getWisdom()
   // Uses node-twitterbot to send the data to twitter and post.
   Bot.tweet(tweet);
}

// Executes once intially on startup.
tweetIt();

// Makes a post every hour.
setInterval(tweetIt, 1000 * 60 * 60)
