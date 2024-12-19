// Treasure.js

class Treasure {
  constructor(name, value) {
      this.name = name;
      this.value = value;
  }

  collect(player) {
      player.addItemToInventory(this);
  }
}

module.exports = Treasure;
