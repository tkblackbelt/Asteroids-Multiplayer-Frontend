import Packet from './Packet';

class PlayerPositionPacket extends Packet {

    constructor(x: Number, y: Number, angle: Number, playerID: String, thrusting: Boolean) {
        super();
        this.x = x;
        this.y = y;
        this.thrusting = thrusting;
        this.angle = angle;
        this.playerID = playerID;
    }

    encode(): JSON {
        return {
            ...super.encode(),
            x: this.round(this.x),
            y: this.round(this.y),
            angle: this.round(this.angle),
            player_id: this.playerID,
            thrusting: this.thrusting
        }
    }

    round(num: Number): Number {
        return Math.round(num * 100) / 100;
    }

    static decode(data: JSON): PlayerPositionPacket {
        const { x, y, angle, player_id, thrusting} = data;
        return new PlayerPositionPacket(x, y, angle, player_id, thrusting);
    }

    static getType(): String {
        return "player_update"
    }
}

export default PlayerPositionPacket;