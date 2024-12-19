// Move.js

class Move {
  constructor(player, dungeon) {
      this.player = player;
      this.dungeon = dungeon;
  }

  execute(direction) {
      const { x, y } = this.dungeon.currentRoom;
      let newX = x, newY = y;

      switch (direction) {
          case "N":
              newY += 1;
              break;
          case "S":
              newY -= 1;
              break;
          case "E":
              newX += 1;
              break;
          case "O":
              newX -= 1;
              break;
          default:
              throw new Error("Direction invalide !");
      }

      // Vérifie les limites et les murs
      const targetRoom = this.dungeon.grid[newX]?.[newY];
      if (!targetRoom) {
          console.log("Vous ne pouvez pas aller plus loin !");
          return;
      }

      this.dungeon.moveToRoom(newX, newY);
      console.log(`Vous êtes maintenant dans la salle (${newX}, ${newY}).`);
  }
}

module.exports = Move;
