// Move.js

class Move {
    constructor(player, dungeon) {
        this.player = player;
        this.dungeon = dungeon;
    }
  
    moveBetweenFloors(direction, x, y, newFloor) {
        const candidateFloor = direction === "N" ? newFloor + 1 : newFloor - 1;
        const midX = x;
        const edgeY = direction === "N" ? this.dungeon.size - 1 : 0;
        const roomType = this.dungeon.getRoomType(newFloor, midX, edgeY);
        const entranceType = direction === "N" ? "entranceUp" : "entranceDown";

        if (roomType === entranceType) {
            newFloor = candidateFloor;
            y = direction === "N" ? 0 : this.dungeon.size - 1;
        } else {
            throw new Error(`Il n'y a pas d'escalier menant vers le ${direction === "N" ? "haut" : "bas"} ici !`);
        }

        return { newFloor, y };
    }

    execute(direction) {
        let { x, y } = this.dungeon.currentRoom;
        let newX = x, newY = y;
        let newFloor = this.dungeon.currentFloor;

        switch (direction) {
            case "N":
                newY += 1;
                if (newY >= this.dungeon.size) {
                    ({ newFloor, y: newY } = this.moveBetweenFloors(direction, x, y, newFloor));
                }
                break;

            case "S":
                newY -= 1;
                if (newY < 0) {
                    ({ newFloor, y: newY } = this.moveBetweenFloors(direction, x, y, newFloor));
                }
                break;

            case "E":
                newX += 1;
                if (newX >= this.dungeon.size) {
                    throw new Error("Impossible de sortir du donjon par l'Est !");
                }
                break;

            case "O":
                newX -= 1;
                if (newX < 0) {
                    throw new Error("Impossible de sortir du donjon par l'Ouest !");
                }
                break;

            default:
                throw new Error("Direction invalide !");
        }

        this.dungeon.moveToRoom(newFloor, newX, newY);
        this.player.position = { floor: newFloor, x: newX, y: newY };
    }
}
  
module.exports = Move;  