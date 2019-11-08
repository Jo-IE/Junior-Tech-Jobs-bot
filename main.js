const Twit = require('twit');
const config = require('./config');

const Twitter = new Twit(config);

function retweet() {
  const params = {
    q: 'junior software job, -filter:retweets',
    result_type: 'recent',
    lang: 'en'
  };
  Twitter.get('search/tweets', params, (err, data) => {
    let tweets = data.statuses;

    if (!err) {
      tweets.forEach(tweet => {
        let retweetId = tweet.id_str;
        Twitter.post('statuses/retweet/:id', { id: retweetId }, (err, res) => {
          if (res) {
            console.log('retweeted');
          }
          console.log('not retweeted');
        });
      });
    }
  });
}

setInterval(retweet, 15000);

//entry-level software job, 1yr experience software job, junior developer "job OR role", entry-level developer job, all levels software engineers, entry-level infosec
