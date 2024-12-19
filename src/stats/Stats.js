// Stats.js

class Stats {
    constructor({
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

    update(stat, value) {
        if (this.hasOwnProperty(stat)) {
            this[stat] += value;
        } else {
            throw new Error(`La statistique '${stat}' n'existe pas.`);
        }
    }
}

module.exports = Stats;