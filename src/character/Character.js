// Character.js

// Classe abstraite Character
class Character {
  constructor(name, stats) {
      if (new.target === Character) {
          throw new Error("Cannot instantiate abstract class Character");
      }
      this.name = name;
      this.stats = { ...stats }; // Encapsulation des statistiques
      this.position = { x: 0, y: 0 }; // Position initiale par défaut
      this.inventory = []; // Inventaire vide au départ
  }

  move(direction) {
      // Méthode de déplacement, à implémenter dans les sous-classes
      throw new Error("Move method must be implemented in a subclass");
  }

  addItemToInventory(item) {
      this.inventory.push(item);
  }

  getStats() {
      return { ...this.stats }; // Retourne une copie des statistiques
  }

  updateStats(statName, value) {
      if (this.stats.hasOwnProperty(statName)) {
          this.stats[statName] += value;
      } else {
          throw new Error(`Stat '${statName}' does not exist.`);
      }
  }
}

// Sous-classe Player
class Player extends Character {
  constructor(name, stats, characterClass) {
      super(name, stats);
      this.characterClass = characterClass; // Guerrier, Mage, Voleur, etc.
  }

  move(direction) {
      switch (direction) {
          case "N":
              this.position.y += 1;
              break;
          case "S":
              this.position.y -= 1;
              break;
          case "E":
              this.position.x += 1;
              break;
          case "O":
              this.position.x -= 1;
              break;
          default:
              throw new Error("Invalid direction");
      }
  }
}

// Export des classes pour usage dans d'autres modules
module.exports = {
  Character,
  Player,
};
