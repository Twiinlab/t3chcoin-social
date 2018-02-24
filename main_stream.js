const Twit = require('twit')
const request = require('request-promise');
const { creds, params } = require('./config');

const options = {  
  method: 'POST',
  url:  params.uri,
  headers: {
    'Accept': 'application/json',
    'Accept-Charset': 'utf-8',
  },
  body : {"socialId": "133729814", "message": "message", "messageTypeIndex": 0},
  json: true 
};

var T = new Twit({
  consumer_key: creds.consumer_key, 
  consumer_secret: creds.consumer_secret, 
  access_token: creds.access_token, 
  access_token_secret: creds.access_token_secret
})


var streamTrack = T.stream('statuses/filter', {
  track: params.track
})

streamTrack.on('tweet', t => {

  console.log(`Text: ${t.text}\n`)
  console.log(`User: ${t.user}\n`)

  reportInteraction( t.user.id_str, t.id_str , getTwitType(t) )
    .then(result => {
      console.log(result);
      followTwit(t.user.screen_name);
      likeTwit(t.id_str);
      replayTwit(t.user.screen_name, t.id_str);
    })
    .catch(error => console.log(error));
})

function followTwit(screen_name){
  // Follow ////
  T.post('friendships/create', {
    screen_name: screen_name
  }, (err, data, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
    }
  })
}

function likeTwit(id_str){
  // Like a twit ////
  T.post('favorites/create', {
    id: id_str
  }, (err, data, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`${data.text} tweet liked!`)
    }
  })
}

function replayTwit(screen_name, id_str){
  // Replay a Twit ////
  T.post('statuses/update', {
    status: '@' + screen_name + ' +1 T3chCoin',
    in_reply_to_status_id: id_str
  }, (err, data, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`${data.text} tweeted!`)
    }
  })
}

async function reportInteraction( socialId, message, messageTypeIndex ){
  const body = {
    socialId: socialId,
    message: message,
    messageTypeIndex: messageTypeIndex
  }
  const customOptions = { ...options, ...{ body: body } } 

  return request(customOptions)
    .then(function (response) {
      console.log(response.url);
      console.log(response.explanation);
    })
    .catch(function (err) {
      console.log(err);
    })
}

function getTwitType(twit) {
  //0: twit, 1:like, 2:retweet
  return (twit.text).substring(0,2) === "RT" ? 2 : 0;
}