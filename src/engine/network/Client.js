import io from 'socket.io-client';
import { decode, PlayerPositionPacket, Packet, GameJoinPacket, GameLeavePacket } from './packets/';
import Player from '../entities/entity/Player';

class Client {

    constructor(gameID: String, playerID: String, player: Player,
        handlePacket: (packet: Packet) => void) {
        this.handlePacket = handlePacket;
        this.socket = null;
        this.gameID = gameID;
        this.player = player;
        this.playerID = playerID;
        this.previousPackets = {};
    }

    connect(host: String): void {
        this.socket = io(host)
        console.log("CONNECTING TO ", host);
        this.socket.on('connect', this.onConnect);
        this.socket.on('disconnect', this.onDisconnect);
        this.socket.on('data', this.onDataReceved);
    }

    disconnect(): void {
        this.onDisconnect();
        this.socket.close();
    }

    getPlayerID(): String {
        return this.playerID;
    }

    /**
     * Callbacks
     */
    onConnect = () => {
        console.log(`Connected to game server gameID: ${this.gameID}`);

        this.sendPacket(new GameJoinPacket(this.playerID, this.gameID,
            this.player.getName(), this.player.getColor()), 'join');
    }

    onDisconnect = () => {
        console.log(`Disconnecting frm game server gameID: ${this.gameID}`);

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

