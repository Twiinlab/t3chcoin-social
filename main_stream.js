var Twit = require('twit')

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
  console.log(`${t.text}\n`)

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



// // USER  ////////////////////////////////////////

// var streamUser = T.stream('user');

// streamUser.on('follow', followed);

// function followed(eventMsg) {
//   console.log('Follow event');
//   var name = eventMsg.source.name;
//   var screenName = eventMsg.source.screen_name;
//   tweetMessage('@' + screenName + "Thank you for following me!")
// }

// function tweetMessage(txt) {

//   var tweet = {
//     status: txt
//   }

//   T.post('statuses/update', tweet, tweeted)

//   function tweeted(err, data, response) {
//     if (err) {
//       console.log("Something went wrong!");
//     }
//     else {
//       console.log("Voila It worked!");
//     }
//   }
// }


