const Room = require('./Room');
const Character = require('../character/Character');

class Dungeon {
  constructor(size_x, size_y, player) {
    this.character = player;
    this.size_x = size_x;
    this.size_y = size_y;
    this.grid = this.generateGrid(size_x, size_y);
    this.currentRoom = [0, 0];
    this.interaction = "";
  }

  generateGrid(size_x, size_y) {
    const grid = [];
    for (let i = 0; i < size_x; i++) {
      grid[i] = [];
      for (let j = 0; j < size_y; j++) {
        grid[i][j] = new Room(); 
      }
    }
    return grid;
  }

  movePlayer(direction) {
    let newRoom = [...this.currentRoom];

    switch (direction) {
      case 'up':
        newRoom[1] += 1;
        break;
      case 'down':
        newRoom[1] -= 1;
        break;
      case 'left':
        newRoom[0] -= 1;
        break;
      case 'right':
        newRoom[0] += 1;
        break;
      default:
        throw new Error('Invalid direction.');
    }
    if (newRoom[0] >= 0 && newRoom[0] < this.size_x && newRoom[1] >= 0 && newRoom[1] < this.size_y) {
      this.currentRoom = newRoom;
    } else {
      this.interaction = "You can't go there!";
    }
  }

  affichage() {
    for (let j = this.grid[0].length - 1; j >= 0; j--) { // Iterate rows from bottom to top
      let row = '';
      for (let i = 0; i < this.grid.length; i++) { // Iterate columns from left to right
        if (this.currentRoom[0] === i && this.currentRoom[1] === j) {
          row += '[P]'; // Display player in the current room
        } else if (this.grid[i][j].icone) {
          row += `[${this.grid[i][j].icone}]`; // Display room icon if available
        } else {
          row += '[ ]'; // Display empty room if no icon
        }
      }
      console.log(row);
    }
    if (this.interaction !== "") {
      console.log(this.interaction);
      this.interaction = "";
    }
    console.log(this.currentRoom);
  }
}

module.exports = Dungeon;