import Packet from './Packet';


class GameInitPacket extends Packet {

    constructor(asteroids, level) {
        super();
        this.asteroids = asteroids;
        this.level = level;
    }

    static decode(data: JSON): GameInitPacket {
        const {asteroids, level} = data;
        return new GameInitPacket(asteroids, level);
    }

    static getType(): String {
        return "game_init"
    }
}

export default GameInitPacket;