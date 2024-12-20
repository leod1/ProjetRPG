const Player = require('../characters/Player');

describe('Tests unitaires pour la création du personnage', () => {
    
    // Test d'acceptation 1.1 : Nom valide
    test('Création d\'un personnage avec un nom valide', () => {
        // GIVEN : Un nom valide et une classe valide
        const name = 'Arthur';
        const classType = 'warrior';

        // WHEN : Le joueur crée un personnage
        const player = new Player(name, classType);

        // THEN : Le personnage est correctement créé
        expect(player.name).toBe(name); // Vérifie le nom
        expect(player.characterClass).toBe(classType); // Vérifie la classe
        expect(player.stats.health).toBe(150); // Vérifie les stats spécifiques au guerrier
    });

    // Test d'acceptation 1.2 : Nom trop court
    test('Création d\'un personnage avec un nom trop court', () => {
        // GIVEN : Un nom trop court
        const shortName = 'Al';
        const classType = 'warrior';

        // WHEN : Le joueur essaie de créer un personnage
        // THEN : Une erreur est levée
        expect(() => new Player(shortName, classType)).toThrow(); // Vérifie qu'une exception est levée
    });

    // Test d'acceptation 1.3 : Nom trop long
    test('Création d\'un personnage avec un nom trop long', () => {
        // GIVEN : Un nom trop long
        const longName = 'A'.repeat(21);
        const classType = 'mage';

        // WHEN : Le joueur essaie de créer un personnage
        // THEN : Une erreur est levée
        expect(() => new Player(longName, classType)).toThrow(); // Vérifie qu'une exception est levée
    });

    // Test d'acceptation 2.1 : Sélection d'une classe valide
    test('Sélection d\'une classe valide', () => {
        // GIVEN : Un nom valide et une classe valide
        const name = 'Lancelot';
        const classType = 'mage';

        // WHEN : Le joueur crée un personnage
        const player = new Player(name, classType);

        // THEN : Le personnage est correctement créé avec les stats de la classe sélectionnée
        expect(player.characterClass).toBe(classType); // Vérifie la classe
        expect(player.stats.mana).toBe(150); // Vérifie les stats spécifiques au mage
    });

    // Test d'acceptation 5.1 : Affichage du récapitulatif du personnage
    test('Affichage du récapitulatif du personnage', () => {
        // GIVEN : Un personnage est créé
        const name = 'Guinevere';
        const classType = 'thief';
        const player = new Player(name, classType);

        // WHEN : Le joueur demande un récapitulatif du personnage
        const summary = player.getSummary();

        // THEN : Le récapitulatif contient toutes les informations correctes
        expect(summary.name).toBe(name); // Vérifie le nom
        expect(summary.class).toBe(classType); // Vérifie la classe
        expect(summary.stats.agility).toBe(15); // Vérifie les stats spécifiques au voleur
        expect(summary.position).toEqual({ x: 0, y: 0 }); // Vérifie la position initiale
        expect(summary.inventory).toEqual([]); // Vérifie que l'inventaire est vide
    });
});