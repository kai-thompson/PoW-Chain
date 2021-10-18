const client = require('./client');
const {PUBLIC_KEY} = require('./userConfig');

client.request('getBalance', [PUBLIC_KEY], function(err, response) {
  if(err) throw err;
  console.log(response.result);
});
