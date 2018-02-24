const Twit = require('twit')
const request = require('request-promise');

// const options = {  
//   method: 'POST',
//   url: 'http://192.168.1.135:3000/api/social',
//   headers: {
//     'Accept': 'application/json',
//     'Accept-Charset': 'utf-8',
//   },
//   body : {"socialId":"133729814","message":"message","messageTypeIndex":0},
//   json: true 
// };

// request(options)
//   .then(function (response) {
//     console.log(response.url);
//     console.log(response.explanation);
//   })
//   .catch(function (err) {
//     console.log(err);
//   })


var T = new Twit({
  consumer_key: 'u9b59kVCyHNCQKobJmEew0nbI'
  , consumer_secret: 'lmvXVODgyTqJzMZhale8wcX3P9jHzygoWyAxsJk2fcIEP5mL44'
  , access_token: '951179972907069440-MdLONAO3uwIoClkmGMItY17vVyD7vXe'
  , access_token_secret: 'ugBPlFuDIimCPpa8zOCjKT26SjtqHPaqoBZ2skUSxTJNe'
})

// TRACK  ////////////////////////////////////////

var streamTrack = T.stream('statuses/filter', {
  track: 'T3chFest'
})

streamTrack.on('tweet', t => {

  console.log(`Text: ${t.text}\n`)
  console.log(`User: ${t.user}\n`)

  // Follow ////
  T.post('friendships/create', {
    screen_name: t.user.screen_name
  }, (err, data, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data)
    }
  })

  // Like a twit ////
  T.post('favorites/create', {
    id: t.id_str
  }, (err, data, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`${data.text} tweet liked!`)
    }
  })

  // Replay a Twit ////
  T.post('statuses/update', {
    status: '@' + t.user.screen_name + ' +1 T3chCoin',
    in_reply_to_status_id: t.id_str
  }, (err, data, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`${data.text} tweeted!`)
    }
  })
})
