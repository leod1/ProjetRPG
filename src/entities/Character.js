// Character.js
const Stats = require('../stats/Stats');

class Character {
    constructor(name, stats) {
        if (new.target === Character) {
            throw new Error("Impossible de créer une instance de la classe Character.");
        }

        this.name = name;
        // Au lieu de copier un objet, on instancie la classe Stats.
        this.stats = new Stats(stats);
        this.position = { x: 0, y: 0 };
        this.inventory = [];
    }

    getPosition() {
        return this.position;
    }
}

module.exports = Character;