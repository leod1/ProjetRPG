const readlineSync = require('readline-sync');

// game.js
const Character = require('./character/Character');
const Dungeon = require('./dungeon/Dungeon');

// Character creation
const name = readlineSync.question('Enter your character name: ');
const classType = readlineSync.question('Choose your class (warrior, mage, thief): ');
const player = new Character(name, classType);

// Dungeon initialization
const dungeon = new Dungeon(20, 10,player);


// Game loop
while (true) {
    console.log("\n");
    console.log("\n");
    console.log("\n");
    dungeon.affichage();
    console.log('What do you want to do?');
    console.log('1. Move (N,S,E,O)');
    console.log('2. Check Inventory');
    console.log('3. Exit Game');

    const choice = readlineSync.question('Enter your choice: ');

    switch (choice) {
        case 'N':
            dungeon.movePlayer('up');
            break;
        case 'E':
            dungeon.movePlayer('right');
            break;
        case 'S':
            dungeon.movePlayer('down');
            break;
        case 'O':
            dungeon.movePlayer('left');
            break;
        case 'M':
            console.log('Exiting game.');
            process.exit();
            break;
        default:
            console.log('Invalid choice.');
  }
}
