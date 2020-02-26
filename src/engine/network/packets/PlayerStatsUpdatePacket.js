import Packet from './Packet';

class PlayerStatsUpdatePacket extends Packet {

    constructor(playerID: String, lives: Number, score: Number) {
        super();
        this.playerID = playerID;
        this.lives = lives;
        this.score = score;
    }

    encode(): JSON {
        return {
            ...super.encode(),
            player_id: this.playerID,
            lives: this.lives,
            score: this.score
        }
    }

    static decode(data: JSON): PlayerStatsUpdatePacket {
        const { player_id, lives, score} = data;
        return new PlayerStatsUpdatePacket(player_id, lives, score);
    }

    static getType(): String {
        return "player_stats"
    }
}

export default PlayerStatsUpdatePacket;