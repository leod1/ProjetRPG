// Dungeon.js

const Room = require("./Room");

class Dungeon {
    constructor(size = 5) {
        this.size = size;
        this.grid = this.generateGrid();
        this.currentRoom = { x: 0, y: 0 };
        this.interaction = ""; // Interaction qui peut avoir lieu -> à rajouter plus tard apres refacto + new systeme de room et combat (combar, loot)
    }

    generateGrid() {
      const grid = [];
      for (let x = 0; x < this.size; x++) {
          grid[x] = [];
          for (let y = 0; y < this.size; y++) {
              const randomNum = Math.random();
              let contentType = "empty";
              if (randomNum < 0.2) contentType = "treasure";
              else if (randomNum < 0.5) contentType = "monster";
  
              grid[x][y] = new Room(x, y, contentType); // Passe le type à la salle
          }
      }
      return grid;
    }
  

    affichage() {
      for (let j = this.grid[0].length - 1; j >= 0; j--) {
          let row = '';
          for (let i = 0; i < this.grid.length; i++) {
              if (this.currentRoom.x === i && this.currentRoom.y === j) {
                  row += '[P]';
              } else if (this.grid[i][j].icone) {
                  row += `[${this.grid[i][j].icone}]`;
              } else {
                  row += '[ ]';
              }
          }
          console.log(row);
      }

      if (this.interaction !== "") {
          console.log(this.interaction);
          this.interaction = "";
      }
      console.log(`Position actuelle : (${this.currentRoom.x}, ${this.currentRoom.y})`);
    }

    getCurrentRoom() {
        return this.grid[this.currentRoom.x][this.currentRoom.y];
    }

    moveToRoom(x, y) {
        if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
            throw new Error("Impossible de sortir du donjon !");
        }
        this.currentRoom = { x, y };
    }
}

module.exports = Dungeon;