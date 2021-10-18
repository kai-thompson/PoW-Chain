const Transaction = require('./models/Transaction');
const UTXO = require('./models/UTXO');
const jayson = require('jayson');
const {startMining, stopMining} = require('./mine');
const {PORT} = require('./config');
const {utxos, mempool} = require('./db');

const server = jayson.server({
  startMining: function(_, callback) {
    callback(null, 'success!');
    startMining();
  },
  stopMining: function(_, callback) {
    callback(null, 'success!');
    stopMining();
  },
  getBalance: function([address], callback) {
    const ourUTXOs = utxos.filter(x => {
      return x.owner === address && !x.spent;
    });
    const sum = ourUTXOs.reduce((p,c) => p + c.amount, 0);
    callback(null, sum);
  },
  newTransfer: function([sender, privateKey, recipient, value], callback) {
    const senderUTXOs = utxos.filter(x => {
      return x.owner === sender && !x.spent;
    });
    const senderSum = senderUTXOs.reduce((p,c) => p + c.amount, 0)

    if(senderSum < value || senderSum === null){
      callback(null, "Insufficient Funds!");
    }else{
      outputs = [
        outputSend = new UTXO(sender, senderSum - value),
        outputRecip = new UTXO(recipient, value)
      ];
  
      const transfer = new Transaction(senderUTXOs, outputs);

      mempool.push(transfer);
      callback(null, `Tranfser of ${value} Sent to ${recipient}!`);
    }
  }
});

server.http().listen(PORT);
