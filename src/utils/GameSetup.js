const readlineSync = require("readline-sync");
const { Player } = require("../character/Character");
const Dungeon = require("../dungeon/Dungeon");
const Move = require("../move/Move");
const { loadGame } = require("./SaveManager");

function initializeNewGame() {
    console.log("\n=== CRÉATION D'UN PERSONNAGE ===");
    const name = readlineSync.question("Entrez le nom de votre personnage : ");
    let classType;
    while (!["warrior", "mage", "thief"].includes(classType)) {
        classType = readlineSync.question("Choisissez votre classe (warrior, mage, thief) : ").toLowerCase();
    }

    // Initialisation des statistiques par classe
    const classStats = {
        warrior: { health: 150, mana: 50, strength: 15, defense: 12 },
        mage: { health: 90, mana: 150, strength: 5, defense: 8 },
        thief: { health: 120, mana: 70, strength: 10, defense: 10 },
    };

    const player = new Player(name, classStats[classType], classType);
    const dungeon = new Dungeon(5);
    const moveHandler = new Move(player, dungeon);

    console.log("\nPersonnage créé avec succès !");
    return { player, dungeon, moveHandler };
}

function promptLoadGame() {
    console.log("\n=== CHARGEMENT D'UNE PARTIE ===");
    const result = loadGame();
    if (result) {
        const { player, dungeon } = result;
        const moveHandler = new Move(player, dungeon);
        console.log("\nPartie chargée avec succès !");
        return { player, dungeon, moveHandler };
    } else {
        console.log("\nAucune sauvegarde trouvée.");
        return null;
    }
}

module.exports = { initializeNewGame, promptLoadGame };