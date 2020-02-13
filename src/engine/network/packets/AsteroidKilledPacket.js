import Packet from './Packet';

class AsteroidKilledPacket extends Packet {

    constructor(asteroidID: String) {
        super();
        this.asteroidID = asteroidID;
    }

    encode(): JSON {
        return {
            ...super.encode(),
            asteroid_id: this.asteroidID
        }
    }

    static decode(data: JSON): AsteroidKilledPacket {
        const { asteroid_id } = data;
        return new AsteroidKilledPacket(asteroid_id);
    }

    static getType(): String {
        return "asteroid_killed"
    }
}

export default AsteroidKilledPacket;