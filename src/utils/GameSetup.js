// GameSetup.js
const readlineSync = require("readline-sync");
const Player = require("../entities/Player");
const Dungeon = require("../dungeon/Dungeon");
const DungeonRenderer = require("../dungeon/DungeonRenderer");
const Move = require("../move/Move");
const { saveGame, loadGame } = require("./SaveManager");

function initializeNewGame() {
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

function gameLoop(player, dungeon, moveHandler) {
    let counter = 0;

    while (true) {
        console.clear();

        if (counter === 0) {
            console.log("\n=== LEGENDE ===");
            console.log("\nLégende des icônes :");
            console.log("\n");
            console.log("[ ] : Salle vide");
            console.log("[P] : Joueur");
            console.log("[M] : Monstre");
            console.log("[T] : Trésor");
            console.log("[U] : Escalier montant. Une fois arrivé sur la case, il suffit de se déplacer une fois de plus vers le Nord pour accéder à la suite.");
            console.log("[D] : Escalier descendant. Même principe que l'escalier montant, mais en se déplaçant vers le Sud.");
            console.log("Appuyez sur Entrée pour continuer...");
            readlineSync.question();
        }
        
        console.clear();

        console.log("\n=== DÉBUT DU TOUR ===");
        console.log("\n=== DONJON ===");
        // Appel à DungeonRenderer pour afficher l'état du donjon
        DungeonRenderer.render(dungeon);

        console.log("\n=== ACTIONS ===");
        console.log("1. Se déplacer (N, S, E, O)");
        console.log("2. Consulter l'inventaire");
        console.log("3. Voir les statistiques du personnage");
        console.log("4. Quitter le jeu");
    
        const choice = readlineSync.question("Entrez votre choix : ").toUpperCase();
    
        switch (choice) {
            case "N":
            case "S":
            case "E":
            case "O":
                try {
                    moveHandler.execute(choice);
                } catch (error) {
                    console.log(error.message);
                }
                break;
    
            case "2":
                player.displayInventory();
                readlineSync.question("\nAppuyez sur Entrée pour continuer...");
                break;
    
            case "3":
                player.displayStats();
                readlineSync.question("\nAppuyez sur Entrée pour continuer...");
                break;
            
            case "4":
                const saveChoice = readlineSync.question("\nVoulez-vous sauvegarder votre partie avant de quitter ? (O/N) : ").toUpperCase();
                if (saveChoice === "O") {
                    saveGame(player, dungeon);
                }
                console.log("Merci d'avoir joué ! À bientôt.");
                process.exit(0);
    
            default:
                console.log("Choix invalide. Veuillez réessayer.");
                readlineSync.question("\nAppuyez sur Entrée pour continuer...");
        }
    
        counter++;
    }
}

function promptLoadGame() {
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

module.exports = { initializeNewGame, promptLoadGame, gameLoop };
