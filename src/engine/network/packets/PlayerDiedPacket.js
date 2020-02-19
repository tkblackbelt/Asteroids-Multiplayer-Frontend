import Packet from './Packet';

class PlayerDiedPacket extends Packet {

    constructor(playerID: String) {
        super();
        this.playerID = playerID;
    }

    encode(): JSON {
        return {
            ...super.encode(),
            player_id: this.playerID
        }
    }

    static decode(data: JSON): PlayerDiedPacket {
        const { player_id} = data;
        return new PlayerDiedPacket(player_id);
    }

    static getType(): String {
        return "player_died"
    }
}

export default PlayerDiedPacket;