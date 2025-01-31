// Player.js
const Character = require('./Character');
const ClassStats = require('../stats/ClassStats');

class Player extends Character {
    constructor(name, classType, customStats = null) {
        const statsToUse = customStats || ClassStats[classType];
        if (!statsToUse) {
            throw new Error(`Le type de personnage "${classType}" est inconnu.`);
        }

        super(name, statsToUse);
        this.characterClass = classType;
    }

    move(direction) {
        const moves = {
            "N": { x: 0, y: 1 },
            "S": { x: 0, y: -1 },
            "E": { x: 1, y: 0 },
            "O": { x: -1, y: 0 }
        };

        const move = moves[direction];
        if (!move) {
            throw new Error("Invalid direction");
        }

        this.position.x += move.x;
        this.position.y += move.y;
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

    displayStats() {
        console.log(`\n=== STATS DE ${this.name.toUpperCase()} ===`);
        console.log(`Classe : ${this.characterClass}`);
        console.log("Statistiques :");
    
        const statsObj = this.stats.toObject();
        for (const stat in statsObj) {
            console.log(`${stat} : ${statsObj[stat]}`);
        }
    }

    inventoryLength() {
        return this.inventory.length
    }

    displayInventory() {
        console.log("\n=== INVENTAIRE ===");
        if (this.inventory.length === 0) {
            console.log("Votre inventaire est vide.");
        } else {
            console.log("Objets dans votre inventaire :");
            this.inventory.forEach((item, index) => {
                console.log(`${index + 1}. ${item.name}`);
            });
        }
    }
    
}

module.exports = Player;
