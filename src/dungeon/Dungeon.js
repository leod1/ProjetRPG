// Dungeon.js
const DungeonGenerator = require('./DungeonGenerator');
const DungeonRenderer = require('./DungeonRenderer');

class Dungeon {
    constructor(numFloors, size) {
        this.numFloors = numFloors;
        this.size = size;
        this.generator = new DungeonGenerator(numFloors, size);
        this.floors = this.generator.generateFloors(); 
        this.currentFloor = 0;
        this.currentRoom = { x: 0, y: 0 };
        this.interaction = "";
    }

    affichage() {
        DungeonRenderer.render(this);
    }

    getCurrentRoom() {
        return this.floors[this.currentFloor][this.currentRoom.x][this.currentRoom.y];
    }

    moveToRoom(floor, x, y) {
        if (floor < 0 || floor >= this.numFloors) {
            throw new Error("Il n'y a pas d'autre étage dans cette direction !");
        }

        if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
            throw new Error("Impossible de sortir des limites de ce niveau !");
        }

        this.currentFloor = floor;
        this.currentRoom = { x, y };
    }

    getRoomType(floor, x, y) {
        if (floor < 0 || floor >= this.numFloors) return null;
        if (x < 0 || x >= this.size || y < 0 || y >= this.size) return null;
        return this.floors[floor][x][y].type;
    }
}

module.exports = Dungeon;