import { tweet } from './bot.js';
import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('chirp chirp!');
});

app.post('/nero73upi22eqnv', (req, res) => {
    tweet();
    res.send('ツイートされました！');
})

app.listen(port, () => {
  console.log(`Server started on :${port}`);
});
