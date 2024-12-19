const fs = require("fs");
const Player = require("../character/Character").Player;
const Dungeon = require("../dungeon/Dungeon");
const Room = require("../dungeon/Room");
const Monster = require("../dungeon/Monster");
const Treasure = require("../dungeon/Treasure");

const saveGame = (player, dungeon, filePath = "savegame.json") => {
    const data = {
        player: {
            name: player.name,
            class: player.characterClass,
            stats: player.stats,
            inventory: player.inventory,
            position: dungeon.currentRoom, // Position actuelle du joueur
        },
        dungeon: {
            size: dungeon.size,
            grid: dungeon.grid.map(row =>
                row.map(room => ({
                    x: room.x,
                    y: room.y,
                    type: room.type,
                    icon: room.icone,
                    isExplored: room.isExplored,
                    content: room.content ? { type: room.type } : null,
                }))
            ),
        },
    };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`Partie sauvegardée dans ${filePath}`);
};

const loadGame = (filePath = "savegame.json") => {
    if (!fs.existsSync(filePath)) {
        console.log("Aucune sauvegarde trouvée.");
        return null;
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Restaurer le joueur
    const player = new Player(
        data.player.name,
        data.player.stats,
        data.player.class
    );
    player.inventory = data.player.inventory;

    // Restaurer le donjon
    const dungeon = new Dungeon(data.dungeon.size);
    dungeon.currentRoom = data.player.position;
    dungeon.grid = data.dungeon.grid.map(row =>
        row.map(roomData => {
            const room = new Room(roomData.x, roomData.y, roomData.type);
            room.isExplored = roomData.isExplored;

            if (roomData.content && roomData.content.type === "treasure") {
                room.addTreasure(new Treasure());
            } else if (roomData.content && roomData.content.type === "monster") {
                room.addMonster(new Monster());
            }
            return room;
        })
    );

    console.log("Partie chargée avec succès !");
    return { player, dungeon };
};

module.exports = { saveGame, loadGame };