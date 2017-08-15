console.log('The bot is starting');

// Requirements
const Twit = require('twit');
const TwitterBot = require('node-twitterbot').TwitterBot;
// Requiring 'config' keeps API keys separate so code is shareable
// Obviously if you kept them right here in your code, it would raise serious security concerns.
const config = require('./config');
const json_data = require('kotowaza.json');

const kotowaza = JSON.stringify(json_data);

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
   // NOTE: this template string's format will have to change. .ja and .en will no longer exist once you have the kotowaza.json file formatted. You will have to use array indexes instead (e.g. - chosen[0] or chosen[1])
   let post = `${chosen.ja}\n${chosen.en}\n#ことわざ`;
   // &#010; - try this & code if the \n returns don't work
   return post;
}

function tweetIt() {
   let tweet = {
      status: getWisdom()
   }

   // Uses node-twitterbot to send the data to twitter and post.
   Bot.tweet(tweet)

   // This lets us know if we successfully tweeted in the console.
   function tweetStatus(err, data, response) {
      if (!err) {
         console.log('Post made successfully!');
         console.log(data);
      } else {
         console.log('Something went wrong!');
         console.log(err);
      }
   }
}

// Executes once intially on startup.
tweetIt();
// Makes a post every forty minutes.
setInterval(tweetIt, 1000 * 40 * 20)