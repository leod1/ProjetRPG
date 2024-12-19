// Item.js

class Item {
  constructor(name, type, effect) {
      this.name = name;
      this.type = type; // Exemple : "weapon", "potion"
      this.effect = effect; // Exemple : { stat: "health", value: 20 }
  }

  use(target) {
      target.updateStats(this.effect.stat, this.effect.value);
  }
}

module.exports = Item;
