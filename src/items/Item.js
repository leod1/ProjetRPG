// Item.js

class Item {
    constructor(name, type, effect) {
      this.name = name; // potion de vie, de mana, épée, armure, etc...
      this.type = type; // potion, weapon, armor, etc...
      this.effect = effect; // recup hp, mana, ou augmentation atk, def, etc...
    }

    use(target) {
        target.updateStats(this.effect.stat, this.effect.value);
    }
}

module.exports = Item;
