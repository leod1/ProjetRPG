const Monster = require('./Monster');
const Treasure = require('./Treasure');

class Room {
  constructor() {
    const randomNum = Math.random();
    if (randomNum < 0.2) {
      this.icone = 'T';
      this.type = 'treasure';
      this.content = new Treasure();
    } else if (randomNum < 0.5) {
      this.icone = 'M';
      this.type = 'monster';
      this.content = new Monster();
    } else {
      this.icone = ' ';
      this.type = 'empty';
      this.content = null;
    }
  }
}

module.exports = Room;