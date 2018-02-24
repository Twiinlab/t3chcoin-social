
const env = process.env.NODE_ENV || 'dev'; //'dev', 'pro'

module.exports = { 
  params: require('./params.json')[env],
  creds: require('./creds.json')
 };