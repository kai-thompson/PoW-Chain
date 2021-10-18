const Block = require("./Block");

class Blockchain {
  constructor() {
    this.blocks = [new Block()];
  }
  addBlock(block) {
    this.blocks.push(block);
  }
  blockHeight() {
    return this.blocks.length;
  }
  isValid(){
    for(let i = this.blocks.length - 1; i >= 1; i--){
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];
      if(currentBlock.previousHash !== previousBlock.hash()) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Blockchain;
