import io from 'socket.io-client';
import {PlayerUpdateT} from './Packets';

class Client {

    constructor(eventHandle) {
        this.eventHandle = eventHandle;
        this.socket = null;
        this.gameID = null;
        this.username = Math.random();
    }

    connect(host: String): void {
        this.socket = io(host)
        this.socket.on('connect', this.onConnect);
        this.socket.on('disconnect', this.onDisconnect);
        this.socket.on('my event', this.onPlayerUpdate);
    }

    /**
     * Callbacks
     */
    onConnect = () => {
        console.log(`Connected to game server`);
    }

    onDisconnect = () => {
        console.log(`Disconnecting from game server`);
    }

    onPlayerUpdate = (data) => {
        this.eventHandle('my event', data);
    }

    /**
     * Emitters
     */
    emitPlayerUpdate = (update: PlayerUpdateT) => {
        this.socket.emit('my event', {...update, id: this.username});
    }
}

export default Client;