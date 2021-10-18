const Blockchain = require('./models/Blockchain');

const db = {
  blockchain: new Blockchain(),
  utxos: [],
  difficulty: ("0x000" + "F".repeat(61)),
  blockTime: [],
  mempool: []
}

module.exports = db;
