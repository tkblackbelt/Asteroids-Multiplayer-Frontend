import Packet from './Packet';

class GameLeavePacket extends Packet {

    constructor(playerID: String, gameID: String) {
        super();
        this.playerID = playerID;
        this.gameID = gameID;
    }

    encode(): JSON {
        return {
            ...super.encode(),
            player_id: this.playerID,
            game_id: this.gameID,
        }
    }

    static decode(data: JSON): GameLeavePacket {
        const { player_id, game_id } = data;
        return new GameLeavePacket(player_id, game_id);
    }

    static getType(): String {
        return "leave_game"
    }
}

export default GameLeavePacket;