const db = require('./db');
const {MINING_SPEED} = require('./config')

function calculateDiff() {
    if(db.blockTime.length === 10){
        const time = db.blockTime;
        var avgTime = 0;
        db.blockTime = [];
        for(let e of time){
            avgTime += e;
        }

        avgTime = avgTime / 10;

        const difference = (MINING_SPEED / avgTime);
        
        const target = (db.difficulty / difference)

        db.difficulty = target
    }
}

module.exports = calculateDiff;