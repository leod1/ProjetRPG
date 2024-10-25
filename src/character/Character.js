class Character {
    constructor(name, classType) {
      if (name.length < 3 || name.length > 15) {
        throw new Error('Name must be between 3 and 15 characters.');
      }
  
      this.name = name;
      this.classType = classType;
      this.stats = this.initializeStats(classType);
      this.inventory = [];
    }
  
    initializeStats(classType) {
      const baseStats = {
        health: 100,
        mana: 50,
        strength: 10,
        defense: 5,
      };
  
      switch (classType) {
        case 'warrior':
          baseStats.health += 50;
          baseStats.strength += 10;
          break;
        case 'mage':
          baseStats.mana += 50;
          break;
        case 'thief':
          baseStats.defense += 5;
          break;
        default:
          throw new Error('Invalid class type.');
      }
  
      return baseStats;
    }

    addItemToInventory(item) {
        this.inventory.push(item);
      }
      
      useItem(itemName) {
        const itemIndex = this.inventory.findIndex(item => item.name === itemName);
        if (itemIndex === -1) throw new Error('Item not found in inventory.');
      
        const item = this.inventory[itemIndex];
      
        if (item.type === 'consumable') {
          if (item.effects.healthRestore) {
            this.stats.health += item.effects.healthRestore;
          }
          // Remove item after use
          this.inventory.splice(itemIndex, 1);
        }
      }
      
      equipItem(item) {
        if (item.type === 'weapon') {
          this.stats.strength += item.effects.strengthBoost;
        }
        if (item.type === 'armor') {
          this.stats.defense += item.effects.defenseBoost;
        }
        // Assume one item per type can be equipped
        this.equipment[item.type] = item;
      }
  }
  
  module.exports = Character;
  