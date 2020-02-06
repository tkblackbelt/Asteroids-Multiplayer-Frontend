import io from 'socket.io-client';
import { decode, PlayerPositionPacket, Packet, GameJoinPacket, GameLeavePacket } from './packets/';

class Client {

    constructor(gameID: String, handlePacket: (packet: Packet) => void) {
        this.handlePacket = handlePacket;
        this.socket = null;
        this.gameID = gameID;
        this.playerID = Math.random().toString();
        this.previousPackets = {};
    }

    connect(host: String): void {
        this.socket = io(host)
        this.socket.on('connect', this.onConnect);
        this.socket.on('disconnect', this.onDisconnect);
        this.socket.on('data', this.onDataReceved);
    }

    getPlayerID(): String {
        return this.playerID;
    }

    /**
     * Callbacks
     */
    onConnect = () => {
        console.log(`Connected to game server gameID: ${this.gameID}`);

        this.sendPacket(new GameJoinPacket(this.playerID, this.gameID), 'join');
    }

    onDisconnect = () => {
        console.log(`Disconnecting from game server gameID: ${this.gameID}`);

        this.sendPacket(new GameLeavePacket(this.playerID, this.gameID), 'leave');
    }

    onDataReceved = (data) => {
        const packet = decode(data);
        this.handlePacket(packet);

    }

    /**
     * Emitters
     */
    sendPacketIfDifferent = (packet: Packet) => {
        const packetType = packet.constructor.getType();
        const previousPacket = this.previousPackets[packetType];

        if (!previousPacket || !previousPacket.equals(packet)) {
            this.sendPacket(packet);
            this.previousPackets[packetType] = packet;
        }
    }

    sendPacket = (packet: Packet, event: String = 'data') => {
        this.socket.emit(event, packet.encode());
    }
}

export default Client;

