import Packet from './Packet';

class PlayerRespawnPacket extends Packet {

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

    static decode(data: JSON): PlayerRespawnPacket {
        const { player_id} = data;
        return new PlayerRespawnPacket(player_id);
    }

    static getType(): String {
        return "player_respawn"
    }
}

export default PlayerRespawnPacket;