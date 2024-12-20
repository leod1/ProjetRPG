// Move.js

class Move {
    constructor(player, dungeon) {
        this.player = player;
        this.dungeon = dungeon;
    }
  
    execute(direction) {
        let { x, y } = this.dungeon.currentRoom;
        let newX = x, newY = y;
        let newFloor = this.dungeon.currentFloor;

        switch (direction) {
            case "N":
                newY += 1;
                if (newY >= this.dungeon.size) {
                    // On essaie de monter d'un étage
                    const candidateFloor = newFloor + 1;
                    const midX = x; 
                    const topY = this.dungeon.size - 1; 

                    // Vérifier l'escalier (entranceUp) sur l'étage courant
                    const topRoomType = this.dungeon.getRoomType(newFloor, midX, topY);
                    if (topRoomType === "entranceUp") {
                        // Passage à l'étage du dessus
                        newFloor = candidateFloor;
                        newY = 0;
                    } else {
                        throw new Error("Il n'y a pas d'escalier menant vers le haut ici !");
                    }
                }
                break;

            case "S":
                newY -= 1;
                if (newY < 0) {
                    // On essaie de descendre d'un étage
                    const candidateFloor = newFloor - 1;
                    const midX = x;

                    // Vérifier l'escalier (entranceDown) sur l'étage courant
                    const bottomRoomType = this.dungeon.getRoomType(newFloor, midX, 0);
                    if (bottomRoomType === "entranceDown") {
                        // Passage à l'étage du dessous
                        newFloor = candidateFloor;
                        newY = this.dungeon.size - 1;
                    } else {
                        throw new Error("Il n'y a pas d'escalier menant vers le bas ici !");
                    }
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