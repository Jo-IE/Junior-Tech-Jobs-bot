const Twit = require('twit');
const config = require('./config');

const Twitter = new Twit(config);

const queryArray = [
  'entry-level software job, -filter:retweets',
  '1yr experience software job, -filter:retweets',
  'junior developer job, -filter:retweets',
  'entry-level developer job, -filter:retweets',
  'all levels software engineers role, -filter:retweets',
  'entry-level infosec job, -filter:retweets',
  'entry-level infosec role, -filter:retweets'
];

const pickQuery = function(array) {
  let index = Math.round(Math.random() * array.length - 1);

  return array[index];
};

function retweet() {
  const params = {
    q: pickQuery(queryArray),
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
