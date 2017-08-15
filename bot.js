console.log('The bot is starting');

// Requirements
const Twit = require('twit');
const TwitterBot = require('node-twitterbot').TwitterBot;

const kotowaza = require('./kotowaza.json');

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

   let chosen = pickTweet(kotowaza);

   // &#010; - try this & code if the \n returns don't work
   let post = `${chosen[0]}\n${chosen[1]}`;

   return post;
}

function tweetIt() {
   let tweet = getWisdom()

   // Uses node-twitterbot to send the data to twitter and post.
   Bot.tweet(tweet);
}

// Executes once intially on startup.
tweetIt();

// Makes a post every forty minutes. With Heroku, you can use the scheduler addon to avoid having to run setInterval() constantly.
// setInterval(tweetIt, 1000 * 40 * 20)
