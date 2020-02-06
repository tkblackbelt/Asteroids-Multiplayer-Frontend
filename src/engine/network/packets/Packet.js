

class Packet {

    encode(): JSON {
        return {
            packet_type: this.constructor.getType()
        };
    }

    equals(other: Pather): Boolean {
        return JSON.stringify(this.encode()) === JSON.stringify(other.encode());
    }

    static decode(data: JSON): Packet {
        throw new Error("Please implement buildFromJson")
    }

    static getType(): String {
        throw new Error("Please implement getPacketType")
    }
}

export default Packet;