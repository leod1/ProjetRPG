// SaveManager.js
const fs = require("fs");
const Player = require("../entities/Player");
const Dungeon = require("../dungeon/Dungeon");
const Room = require("../room/Room");
const Monster = require("../entities/Monster");
const Treasure = require("../items/Treasure");

const saveGame = (player, dungeon, filePath = "savegame.json") => {
    const data = {
        player: {
            name: player.name,
            class: player.characterClass,
            stats: player.stats.toObject(),
            inventory: player.inventory,
            position: {
                floor: dungeon.currentFloor,
                x: player.position.x,
                y: player.position.y
            }
        },
        dungeon: {
            numFloors: dungeon.numFloors,
            size: dungeon.size,
            floors: dungeon.floors.map(floorGrid =>
                floorGrid.map(row =>
                    row.map(room => ({
                        x: room.x,
                        y: room.y,
                        type: room.type,
                        icon: room.icon,
                        isExplored: room.isExplored,
                        content: room.content ? { type: room.type } : null,
                    }))
                )
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

    // Créer le joueur avec ses stats reconstituées
    const player = new Player(
        data.player.name,
        playerClass,
        data.player.stats
    );
    player.inventory = data.player.inventory; 
    player.position = { 
        floor: data.player.position.floor, 
        x: data.player.position.x, 
        y: data.player.position.y 
    };

    // Créer un donjon vide avec le bon nombre d'étages et la bonne taille
    const dungeon = new Dungeon(data.dungeon.numFloors, data.dungeon.size);

    // Restaurer les floors
    dungeon.floors = data.dungeon.floors.map(floorGrid =>
        floorGrid.map(row =>
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
        )
    );

    // Mettre à jour la salle actuelle et l'étage actuel du donjon
    dungeon.currentFloor = player.position.floor;
    dungeon.currentRoom = { x: player.position.x, y: player.position.y };

    console.log("Partie chargée avec succès !");
    return { player, dungeon };
};

module.exports = { saveGame, loadGame };