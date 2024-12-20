const fs = require("fs");
const Player = require("../entities/Character").Player;
const Dungeon = require("../dungeon/Dungeon");
const Room = require("../dungeon/Room");
const Monster = require("../entities/Monster");
const Treasure = require("../dungeon/Treasure");

const saveGame = (player, dungeon, filePath = "savegame.json") => {
    const data = {
        player: {
            name: player.name,
            class: player.characterClass,
            stats: player.stats,
            inventory: player.inventory,
            position: { x: player.position.x, y: player.position.y }, // Position actuelle du joueur
        },
        dungeon: {
            size: dungeon.size,
            grid: dungeon.grid.map(row =>
                row.map(room => ({
                    x: room.x,
                    y: room.y,
                    type: room.type,
                    icon: room.icon,
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

    const validClasses = ["warrior", "mage", "thief"];
    const playerClass = validClasses.includes(data.player.class)
        ? data.player.class
        : "warrior"; // Classe par défaut si la sauvegarde est corrompue

    const player = new Player(
        data.player.name,
        data.player.class,
        data.player.stats
    );

    player.position = data.player.position; // Restauration de la position
    player.inventory = data.player.inventory; // Restauration de l'inventaire

    // Restaurer le donjon
    const dungeon = new Dungeon(data.dungeon.size);
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

    // Mettre à jour la salle actuelle en fonction de la position du joueur
    const { x, y } = player.position;
    dungeon.currentRoom = dungeon.grid[x][y];

    console.log("Partie chargée avec succès !");
    return { player, dungeon };
};

module.exports = { saveGame, loadGame };