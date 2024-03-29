import fs from 'fs';
import { TwitterBot } from 'node-twitterbot';

const loadJSON = path => 
    JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const kotowazaData = loadJSON('./kotowaza.json');

const random = arr => {
   const randomNumber = Math.floor(Math.random() * arr.length);
   return arr[randomNumber];
}

console.log('Running bot setup');

// Setup for config variables in Heroku
const bot = new TwitterBot({
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});


// The main funcion that returns a random proverb
const getWisdom = data => {

   const chosen = random(data);

   const [withKanji, furigana, imiUnrefined] = chosen;
   
   const kotowaza = `【${withKanji}】\n${furigana}`;
   
   const imi = imiUnrefined.split(/\n\n/)[1];

   const post = `${kotowaza}\n～\n${imi}`;

   if ( post.length > 140 ) 
   {
       return `${post.substring(0, 139)}…`;
   }

   return post;
}

const tweet = () => {
    const kotowaza = getWisdom(kotowazaData);
    console.log('tweeting...')
    console.log(kotowaza);
    bot.tweet(kotowaza);
};

export {tweet}
