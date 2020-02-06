import Packet from './Packet';

type PlayerConfigT = {
    player_id: Number,
    player_name: String,
    x: Number,
    y: Number,
}

type GameInitConfigT = {
    players: [PlayerConfigT],
    asteroids: [],
    level: Number,
    score: Number
}

class GameInitPacket extends Packet {

    constructor(config: GameInitConfigT) {
        super();
        this.config = config;
    }

    getConfig(): GameInitConfigT {
        return this.config;
    }

    static decode(data: JSON): GameInitPacket {
        return new GameInitPacket(data);
    }

    static getType(): String {
        return "game_init"
    }
}

export default GameInitPacket;