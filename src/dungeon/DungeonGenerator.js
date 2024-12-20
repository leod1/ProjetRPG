// DungeonGenerator.js
const Room = require("../room/Room");
const getRandomContent = require("../utils/GetRandomContent");

class DungeonGenerator {
    constructor(numFloors, size) {
        this.numFloors = numFloors;
        this.size = size;
    }

    generateFloors() {
        const floors = [];
        for (let f = 0; f < this.numFloors; f++) {
            const floor = this.generateFloor(f);
            floors.push(floor);
        }
        return floors;
    }

    generateFloor(floorIndex) {
        const grid = [];
        for (let x = 0; x < this.size; x++) {
            grid[x] = [];
            for (let y = 0; y < this.size; y++) {
                const contentType = getRandomContent();
                grid[x][y] = new Room(x, y, contentType);
            }
        }

        this.addEntrances(grid, floorIndex);
        return grid;
    }

    addEntrances(grid, floorIndex) {
        // Ajouter un "entranceUp" sur la rangée du haut si ce n'est pas le dernier floor
        if (floorIndex < this.numFloors - 1) {
            const midX = Math.floor(this.size / 2);
            const topY = this.size - 1;
            grid[midX][topY] = new Room(midX, topY, "entranceUp");
        }

        // Ajouter un "entranceDown" sur la rangée du bas si ce n'est pas le premier floor
        if (floorIndex > 0) {
            const midX = Math.floor(this.size / 2);
            const bottomY = 0;
            grid[midX][bottomY] = new Room(midX, bottomY, "entranceDown");
        }
    }
}

module.exports = DungeonGenerator;
