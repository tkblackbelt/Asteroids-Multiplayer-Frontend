import Packet from './Packet';

class GameJoinPacket extends Packet {

    constructor(playerID: String, playerName: String, gameID: String) {
        super();
        this.playerID = playerID;
        this.playerName = playerName
        this.gameID = gameID;
    }

    encode(): JSON {
        return {
            ...super.encode(),
            player_id: this.playerID,
            player_name: this.playerName,
            game_id: this.gameID
        }
    }

    static decode(data: JSON): GameJoinPacket {
        const { player_id, game_id, player_name } = data;
        return new GameJoinPacket(player_id, game_id, player_name);
    }

    static getType(): String {
        return "join_game"
    }
}

export default GameJoinPacket;