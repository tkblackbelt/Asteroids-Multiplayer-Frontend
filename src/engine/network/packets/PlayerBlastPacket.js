import Packet from './Packet';

class PlayerBlastPacket extends Packet {

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

    static decode(data: JSON): PlayerBlastPacket {
        const { player_id} = data;
        return new PlayerBlastPacket(player_id);
    }

    static getType(): String {
        return "player_blast"
    }
}

export default PlayerBlastPacket;