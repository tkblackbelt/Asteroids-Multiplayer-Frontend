import Packet from './Packet';

class GameJoinPacket extends Packet {

    constructor(playerID: String, gameID: String) {
        super();
        this.playerID = playerID;
        this.gameID = gameID;
    }

    encode(): JSON {
        return {
            ...super.encode(),
            player_id: this.playerID,
            game_id: this.gameID
        }
    }

    static decode(data: JSON): GameJoinPacket {
        const { player_id, game_id } = data;
        return new GameJoinPacket(player_id, game_id);
    }

    static getType(): String {
        return "join_game"
    }
}

export default GameJoinPacket;