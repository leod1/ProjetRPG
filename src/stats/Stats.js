// Stats.js

class Stats {
    constructor({
        // Valeurs par défaut pour les stats.
        health = 100,
        mana = 50,
        strength = 10,
        intelligence = 10,
        defense = 10,
        magicResist = 5,
        agility = 5,
        luck = 5,
        endurance = 5,
        spirit = 5,
    } = {}) {
        this.health = health;
        this.mana = mana;
        this.strength = strength;
        this.intelligence = intelligence;
        this.defense = defense;
        this.magicResist = magicResist;
        this.agility = agility;
        this.luck = luck;
        this.endurance = endurance;
        this.spirit = spirit;
    }

    // Pour quand le combat et les objets seront implem.
    update(stat, value) {
        return;
    }
    
    // Transforme les stats en objet pour les sauvegarder.
    toObject() {
        return {
            health: this.health,
            mana: this.mana,
            strength: this.strength,
            intelligence: this.intelligence,
            defense: this.defense,
            magicResist: this.magicResist,
            agility: this.agility,
            luck: this.luck,
            endurance: this.endurance,
            spirit: this.spirit,
        };
    }
}

module.exports = Stats;