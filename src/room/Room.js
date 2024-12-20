// Room.js
class Room {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.icon = this.getIconFromType(type);
    }

    getIconFromType(type) {
        switch (type) {
            case 'treasure': return 'T';
            case 'monster': return 'M';
            case 'entranceUp': return 'U';
            case 'entranceDown': return 'D';
            default: return ' ';
        }
    }
}

module.exports = Room;