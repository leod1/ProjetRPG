// Monster.js

class Monster {
  constructor(name, stats) {
      this.name = name;
      this.stats = { ...stats };
  }

  attack(target) {
      const damage = Math.max(this.stats.attack - target.stats.defense, 0);
      target.updateStats("health", -damage);
      return damage;
  }
}

module.exports = Monster;