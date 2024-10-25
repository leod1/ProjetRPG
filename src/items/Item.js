class Item {
    constructor(name, type, effects) {
      this.name = name;
      this.type = type; // 'consumable', 'weapon', 'armor'
      this.effects = effects; // { healthRestore: 50 }, { strengthBoost: 10 }, etc.
    }
  }
  
  module.exports = Item;