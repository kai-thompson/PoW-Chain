const Block = require('./models/Block');
const Transaction = require('./models/Transaction');
const UTXO = require('./models/UTXO');
const db = require('./db');
const calculateDiff = require('./calculateDiff');
const {PUBLIC_KEY} = require('./scripts/userConfig');
const BLOCK_REWARD = 10;

let mining = false;

function startMining() {
  mining = true;
  mine();
}

function stopMining() {
  mining = false;
}

function mine() {
  if(!mining || !db.blockchain.isValid()) return;

  const block = new Block();

  const temppool = db.mempool
  for(let i = temppool.length - 1; i >= 0; i--) {
    block.addTransaction(temppool[i]);
  }

  db.mempool.filter(transaction => db.mempool.indexOf(transaction) === -1)
  
  const coinbaseUTXO = new UTXO(PUBLIC_KEY, BLOCK_REWARD);
  const coinbaseTX = new Transaction([], [coinbaseUTXO]);
  block.addTransaction(coinbaseTX);

  while(BigInt('0x' + block.hash()) >= db.difficulty) {
    block.nonce++;
  }

  block.previousHash = db.blockchain.blocks[db.blockchain.blocks.length - 1].hash();

  block.execute();

  db.blockTime.push(Date.now() - block.timestamp);

  console.log(block);

  db.blockchain.addBlock(block);

  console.log(`Mined block #${db.blockchain.blockHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`);

  calculateDiff()

  setTimeout(mine);
}

module.exports = {
  startMining,
  stopMining,
};
