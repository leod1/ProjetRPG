// DungeonRenderer.js

class DungeonRenderer {
    static render(dungeon) {
        const currentGrid = dungeon.floors[dungeon.currentFloor];

        for (let j = dungeon.size - 1; j >= 0; j--) {
            let row = '';
            for (let i = 0; i < dungeon.size; i++) {
                if (dungeon.currentRoom.x === i && dungeon.currentRoom.y === j) {
                    row += '[P]';
                } else if (currentGrid[i][j].icon) {
                    row += `[${currentGrid[i][j].icon}]`;
                } else {
                    row += '[ ]';
                }
            }
            console.log(row);
        }

        if (dungeon.interaction !== "") {
            console.log(dungeon.interaction);
            dungeon.interaction = "";
        }
        console.log(`Position actuelle : Floor ${dungeon.currentFloor}, (${dungeon.currentRoom.x}, ${dungeon.currentRoom.y})`);
    }
}

module.exports = DungeonRenderer;
