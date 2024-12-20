const Monster = require("../entities/Monster");
const Treasure = require("./Treasure");

class Room {
    constructor(x, y, contentType = "empty") {
        this.x = x;
        this.y = y;
        this.isExplored = false;

        switch (contentType) {
            case "treasure":
                this.icone = "T";
                this.type = "treasure";
                this.content = new Treasure();
                break;
            case "monster":
                this.icone = "M";
                this.type = "monster";
                this.content = new Monster();
                break;
            default:
                this.icone = " ";
                this.type = "empty";
                this.content = null;
        }
    }

    explore() {
        this.isExplored = true;
    }

    isEmpty() {
        return this.type === "empty";
    }

    addMonster(monster) {
        this.type = "monster";
        this.icone = "M";
        this.content = monster;
    }

    addTreasure(treasure) {
        this.type = "treasure";
        this.icone = "T";
        this.content = treasure;
    }
}

module.exports = Room;