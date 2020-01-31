import Game, { GameConfigT } from './Game';
import Client from './network/Client';
import { PlayerUpdateT } from './network/Packets';
import Player from './entities/entity/Player';

class NetworkGame extends Game {

    constructor(config: GameConfigT, host: String) {
        super(config);

        this.client = new Client(this.handleEvent);
        this.otherPlayers = {};
        this.client.connect(host);
        this.previousPlayerUpdate = null;
    }

    update(): void {
        super.update();

        const position = this.getPlayer().getPosition();
        const playerUpdate: PlayerUpdateT = {
            angle: this.getPlayer().getAngle(),
            x: Math.round(position.x),
            y: Math.round(position.y)
        }

        if (this.client && JSON.stringify(playerUpdate) !== JSON.stringify(this.previousPlayerUpdate)) {
            this.client.emitPlayerUpdate(playerUpdate);
            this.previousPlayerUpdate = playerUpdate;
        }
    }

    handleEvent = (eventName: String, update) => {
        if (!this.client){
            return;
        }

        switch (eventName) {
            case 'my event':
                const event: PlayerUpdateT = update;
                console.log(event.id);
                if (event.id !== this.client.username) {

                    let player = this.otherPlayers[event.id];
                    if (!player) {
                        player = new Player(event.x, event.y);
                        this.otherPlayers[event.id] = player;
                    }
                    player.position.x = event.x;
                    player.position.y = event.y;
                    player.angle = event.angle;

                }
                break;
            default:
                console.log(`UNKNOWN EVENT ${eventName}`)
                break;
        }
    };

    draw(context: CanvasRenderingContext2D): void {
        super.draw(context);

        Object.values(this.otherPlayers).forEach(player => player.draw(context));
    }
}

export default NetworkGame