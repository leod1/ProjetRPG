class Monster {
    constructor() {
      this.stats = {
        health: 50,
        maxHealth: 50,
        attack: 10,
        defense: 5,
      };
    }
  
    attackPlayer(player) {
      const damage = this.stats.attack - player.stats.defense;
      player.stats.health -= damage > 0 ? damage : 0;
    }
  }
  
  module.exports = Monster;
  