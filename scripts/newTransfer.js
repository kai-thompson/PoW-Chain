const client = require('./client');
const {PUBLIC_KEY, PRIVATE_KEY, RECIPIENT} = require('./userConfig');

client.request('newTransfer', [PUBLIC_KEY, PRIVATE_KEY, RECIPIENT, 15], function(err, response) {
  if(err) throw err;
  console.log(response.result); // success!
});
