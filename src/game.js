// Pour avoir le bon affichage des caractères spéciaux ("Entrée" principalement) :
// chcp 65001 dans le terminal avant de lancer le fichier

// const readlineSync = require("readline-sync");

// // Import des modules
// const { Player } = require("./character/Character");
// const { saveGame, loadGame } = require("./utils/SaveManager");
// const Dungeon = require("./dungeon/Dungeon");
// const Move = require("./move/Move");
// const Stats = require("./stats/Stats");

// Création du personnage
// console.log("Bienvenue dans le RPG Dungeon Explorer !");
// const name = readlineSync.question("Entrez le nom de votre personnage : ");
// let classType;
// while (!["warrior", "mage", "thief"].includes(classType)) {
//     classType = readlineSync.question(
//         "Choisissez votre classe (warrior, mage, thief) : "
//     ).toLowerCase();
// }

// // Initialisation des statistiques en fonction de la classe
// const classStats = {
//     warrior: new Stats({
//         health: 150,
//         mana: 50,
//         strength: 15,
//         defense: 12,
//         agility: 8,
//         luck: 5,
//         endurance: 10,
//         spirit: 4,
//     }),
//     mage: new Stats({
//         health: 90,
//         mana: 150,
//         strength: 4,
//         defense: 5,
//         agility: 7,
//         luck: 6,
//         endurance: 5,
//         spirit: 10,
//     }),
//     thief: new Stats({
//         health: 110,
//         mana: 70,
//         strength: 10,
//         defense: 8,
//         agility: 15,
//         luck: 12,
//         endurance: 7,
//         spirit: 6,
//     }),
// };

// const player = new Player(name, classStats[classType], classType);

// // Initialisation du donjon
// const dungeon = new Dungeon(5); // Donjon de 5x5 par défaut
// const moveHandler = new Move(player, dungeon);

// Boucle de jeu
// while (true) {
//     let counter = 0;

//     if(counter === 0) {
//         // Légende des icônes
//         console.log("\n=== LÉGENDE ===");
//         console.log("Avant de commencer, voici la légende des icônes :\n");
//         console.log("[P] : Joueur");
//         console.log("[T] : Trésor");
//         console.log("[M] : Monstre");
//         console.log("[ ] : Salle vide");
//         readlineSync.question("\nAppuyez sur Entrée pour continuer..."); // Affichage de "Entrée" buggé -> voir ligne en haut du fichier
//     }

//     console.clear(); // a changer, affichage bug quand on remonte et que des donjons sont affichés
//     console.log("\n=== DONJON ===");
//     dungeon.affichage(); // Position du joueur dans la fonction

//     // Actions
//     console.log("\n=== ACTIONS ===");
//     console.log("Que voulez-vous faire ?");
//     console.log("1. Se déplacer (N, S, E, O)");
//     console.log("2. Consulter l'inventaire");
//     console.log("3. Quitter le jeu");

//     const choice = readlineSync.question("Entrez votre choix : ").toUpperCase();

//     switch (choice) {
//         case "N":
//         case "S":
//         case "E":
//         case "O":
//             try {
//                 moveHandler.execute(choice);
//             } catch (error) {
//                 console.log(error.message);
//             }
//             break;
//         case "2":
//             console.log("\n=== INVENTAIRE ===");
//             if (player.inventory.length === 0) {
//                 console.log("Votre inventaire est vide.");
//             } else {
//                 console.log("Objets dans votre inventaire :");
//                 player.inventory.forEach((item, index) => {
//                     console.log(`${index + 1}. ${item.name}`);
//                 });
//             }
//             readlineSync.question("\nAppuyez sur Entrée pour continuer...");
//             break;
//         case "3":
//             console.log("Fin du jeu.");
//             process.exit(0);
//         default:
//             console.log("Choix invalide. Veuillez réessayer.");
//             readlineSync.question("\nAppuyez sur Entrée pour continuer...");
//     }

//     // Fin de tour
//     counter++;
// }

const readlineSync = require("readline-sync");
const { saveGame } = require("./utils/SaveManager");
const { initializeNewGame, promptLoadGame } = require("./utils/GameSetup");

let player = null;
let dungeon = null;
let moveHandler = null;

// Demander à l'utilisateur s'il souhaite charger une partie au début
console.log("\nBienvenue dans le RPG Dungeon Explorer !");
const loadChoice = readlineSync.question("Voulez-vous charger une partie existante ? (O/N) : ").toUpperCase();
if (loadChoice === "O") {
    const result = promptLoadGame();
    if (result) {
        player = result.player;
        dungeon = result.dungeon;
        moveHandler = result.moveHandler;
    }
}

if (!player) {
    const result = initializeNewGame();
    player = result.player;
    dungeon = result.dungeon;
    moveHandler = result.moveHandler;
}

// Boucle de jeu
while (true) {
    console.clear();
    console.log("\n=== DONJON ===");
    dungeon.affichage();

    console.log("\n=== ACTIONS ===");
    console.log("1. Se déplacer (N, S, E, O)");
    console.log("2. Consulter l'inventaire");
    console.log("3. Charger une partie");
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
            console.log("\n=== INVENTAIRE ===");
            if (player.inventory.length === 0) {
                console.log("Votre inventaire est vide.");
            } else {
                console.log("Objets dans votre inventaire :");
                player.inventory.forEach((item, index) => {
                    console.log(`${index + 1}. ${item.name}`);
                });
            }
            readlineSync.question("\nAppuyez sur Entrée pour continuer...");
            break;

        case "3":
            if (player && dungeon) {
                const saveChoice = readlineSync.question("\nUne partie est en cours. Voulez-vous la sauvegarder ? (O/N) : ").toUpperCase();
                if (saveChoice === "O") {
                    saveGame(player, dungeon);
                }
            }
            const result = promptLoadGame();
            if (result) {
                player = result.player;
                dungeon = result.dungeon;
                moveHandler = result.moveHandler;
            }
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
}