require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    encrypted: true,
});

const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');
res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/message', async (req, res) => {
  const { body } = req
  const { message } = body
  const result = sentiment.analyze(message);
  const comparative = result.comparative;


  const data = {
    message,
    score : result.score,
    timeStamp: new Date(),
  };

    try {
    pusher.trigger('comments', 'message', data);
  } catch (e) {
    console.log(e);
  }
  res.json(data);
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
