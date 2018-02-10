var Twit = require('twit')

var T = new Twit({
    consumer_key:         'u9b59kVCyHNCQKobJmEew0nbI'
  , consumer_secret:      'lmvXVODgyTqJzMZhale8wcX3P9jHzygoWyAxsJk2fcIEP5mL44'
  , access_token:         '951179972907069440-MdLONAO3uwIoClkmGMItY17vVyD7vXe'
  , access_token_secret:  'ugBPlFuDIimCPpa8zOCjKT26SjtqHPaqoBZ2skUSxTJNe'
  , timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

//
//  tweet 'hello world!'
//
T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})

T.get('followers/ids', { screen_name: 't3chcoin' },  function (err, data, response) {
  console.log(data)
})

