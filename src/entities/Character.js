// Character.js

class Character {
    constructor(name, stats) {
        if (new.target === Character) {
            throw new Error("Impossible de créer une instance de la classe Character.");
        }

        this.name = name;
        this.stats = { ...stats }; // Encapsulation des statistiques
        this.position = { x: 0, y: 0 }; // Position initiale par défaut
        this.inventory = []; // Inventaire vide au départ
    }
}

// Sous-classe Player -> a sortir apres
class Player extends Character {
    constructor(name, classType, customStats = null) {
        const classStats = {
            warrior: {
                health: 150, mana: 50, strength: 15, intelligence: 5,
                defense: 12, magicResistance: 6, agility: 8, luck: 5,
                endurance: 10, spirit: 4
            },
            mage: {
                health: 90, mana: 150, strength: 4, intelligence: 15,
                defense: 5, magicResistance: 12, agility: 7, luck: 6,
                endurance: 5, spirit: 10
            },
            thief: {
                health: 110, mana: 70, strength: 10, intelligence: 7,
                defense: 8, magicResistance: 7, agility: 15, luck: 12,
                endurance: 7, spirit: 6
            }
        };

        super(name, customStats || classStats[classType]);
        this.characterClass = classType;
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

    addToInventory(item) {
        this.inventory.push(item);
    }

    useItem(item) {
        const index = this.inventory.indexOf(item);
        if (index !== -1) {
            this.inventory.splice(index, 1);
            return true;
        }
        return false;
    }

    getPosition() {
        return this.position;
    }

    displayStats() {
        console.log(`\n=== STATS DE ${this.name.toUpperCase()} ===`);
        console.log(`Classe : ${this.characterClass}`);
        console.log("Statistiques :");
        for (const stat in this.stats) {
            console.log(`${stat} : ${this.stats[stat]}`);
        }
    }
}

// Export des classes pour usage dans d'autres modules
module.exports = {
  Character,
  Player,
};