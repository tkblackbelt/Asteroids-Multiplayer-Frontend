import Packet from './Packet';

class GameJoinPacket extends Packet {

    constructor(playerID: String, gameID: String, playerName: String, color: String) {
        super();
        this.playerID = playerID;
        this.playerName = playerName
        this.gameID = gameID;
        this.color = color;
    }

    encode(): JSON {
        return {
            ...super.encode(),
            player_id: this.playerID,
            player_name: this.playerName,
            game_id: this.gameID,
            color: this.color
        }
    }

    static decode(data: JSON): GameJoinPacket {
        const { player_id, game_id, player_name, color } = data;
        return new GameJoinPacket(player_id, game_id, player_name, color);
    }

    static getType(): String {
        return "join_game"
    }
}

export default GameJoinPacket;