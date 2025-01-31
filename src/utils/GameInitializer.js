const readlineSync = require("readline-sync");
const Player = require("../entities/Player");
const Dungeon = require("../dungeon/Dungeon");
const Move = require("../move/Move");

class GameInitializer {
    static initializeNewGame() {
        console.log("\n=== CRÉATION D'UN PERSONNAGE ===");
        const name = readlineSync.question("Entrez le nom de votre personnage : ");
        let classType;
        while (!["warrior", "mage", "thief"].includes(classType)) {
            classType = readlineSync.question("Choisissez votre classe (warrior, mage, thief) : ").toLowerCase();
        }

        const player = new Player(name, classType);
        const dungeon = new Dungeon(5, 5);
        const moveHandler = new Move(player, dungeon);

        console.log("\nPersonnage créé avec succès !");
        return { player, dungeon, moveHandler };
    }

    static promptLoadGame(loadGame) {
        console.log("\n=== CHARGEMENT D'UNE PARTIE ===");

        const result = loadGame(); // Charge les données depuis le fichier JSON
        if (result) {
            try {
                const { player, dungeon } = result;

                // Recréation du gestionnaire de déplacements
                const moveHandler = new Move(player, dungeon);

                return { player, dungeon, moveHandler };
            } catch (error) {
                console.error("Erreur lors du chargement de la partie :", error.message);
                return null;
            }
        } else {
            return null;
        }
    }
}

module.exports = GameInitializer;