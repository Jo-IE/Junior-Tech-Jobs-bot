const Twit = require('twit');
const config = require('./config');

const Twitter = new Twit(config);

const queryArray = [
  '1yr experience software job,',
  'hiring entry-level developer -business,',
  'all levels software engineers role,',
  'entry-level infosec role,',
  'entry-level security analyst job,',
  ' junior infosec openings',
  'junior sofware engineer openings,',
  'junior developer openings -business -curriculum,',
  'hiring associate developer -business -curriculum,',
  'looking for junior developer -business -curriculum,',
  'looking for associate developer -business -curriculum,',
  'looking for entry-level software engineer,',
  'looking for junior frontend engineer,',
  'looking for junior backend engineer,',
  'looking for junior systems developer,',
  'looking for entry-level systems developer,',
  'hiring entry-level systems developer,',
  'hiring junior backend engineer,',
  'hiring junior frontend engineer,',
  'hiring junior QA engineer,',
  'hiring entry-level QA engineer,',
  'hiring entry-level security engineer,',
  'hiring entry-level product manager,',
  'hiring entry-level web designer,',
  'hiring junior android developer,'
];
let prevIndex = 0;
const pickQuery = function(array) {
  let index = Math.floor(Math.random() * (array.length - 1));
  while (prevIndex === index) {
    index = Math.floor(Math.random() * (array.length - 1));
  }
  prevIndex = index;
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
