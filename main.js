const Twit = require('twit');
const config = require('./config');

const Twitter = new Twit(config);

const queryArray = [
  'entry-level software job,',
  '1yr experience software job,',
  'junior developer job -business,',
  'entry-level developer job -business,',
  'all levels software engineers role,',
  'entry-level infosec job,',
  'entry-level infosec role,',
  'entry-level security analyst job,',
  ' junior infosec openings',
  'junior sofware engineer openings',
  'junior developer openings -business',
  'associate developer -business',
  'looking for junior developer -business',
  'looking for associate developer -business',
  'looking for entry-level software engineer',
  'looking for junior frontend engineer',
  'looking for junior backend engineer',
  'looking for junior systems developer',
  'looking for entry-level systems developer'
];

const pickQuery = function(array) {
  let index = Math.floor(Math.random() * array.length - 1);

  return array[index] + ' -filter:retweets';
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
