import Game, { GameConfigT } from './Game';
import Client from './network/Client';
import {
    Packet,
    PlayerPositionPacket,
    PlayerBlastPacket,
    GameInitPacket,
    GameJoinPacket,
    GameLeavePacket
} from './network/packets';
import Player from './entities/entity/Player';
import Asteroid from './entities/entity/Asteroid';

class NetworkGame extends Game {

    constructor(config: GameConfigT, host: String, game_id: String) {
        super(config);

        this.client = new Client("123", this.handlePacket);
        this.otherPlayers = {};
        this.client.connect(host);
        this.previousPlayerUpdate = null;
    }

    getPlayers(): [Player] {
        return this.otherPlayers;
    }

    shootPlayerBullet(): void {
        super.shootPlayerBullet();
        this.client.sendPacket(new PlayerBlastPacket(this.client.getPlayerID()));
    }

    initializeLevel() {
        // const baseAsteroidFieldSize = 1;
        // const asteroidFieldSize = numberBetween(1, this.level) + baseAsteroidFieldSize;
        // const asteroidField = generateAsteroidField(asteroidFieldSize, this.screenWidth, this.screenHeight);

        // this.setAsteroids(asteroidField);
       
    }

    update(): void {
        super.update();

        if (this.client) {
            this.client.sendPacketIfDifferent(this.getPlayerPositionPacket());

            Object.values(this.otherPlayers).forEach(player => {
                player.update(this.screenWidth, this.screenHeight)
            });
        }
    }

    getPlayerPositionPacket(): PlayerPositionPacket {
        const player = this.getPlayer();
        const position = player.getPosition();

        return new PlayerPositionPacket(
            position.x,
            position.y,
            player.getAngle(),
            this.client.getPlayerID()
        );
    }

    draw(context: CanvasRenderingContext2D): void {
        super.draw(context);
        Object.values(this.otherPlayers).forEach(player => player.draw(context));
    }

    isNotMyPlayer(playerID: String): Boolean {
        return playerID !== this.client.playerID;
    }

    handlePacket = (packet: Packet): void => {
        if (packet instanceof PlayerPositionPacket) {
            this.handlePlayerPositionPacket(packet);
        } else if (packet instanceof PlayerBlastPacket) {
            this.handlePlayerBlastPacket(packet);
        } else if (packet instanceof GameInitPacket) {
            this.handleGameInitPacket(packet);
        } else if (packet instanceof GameJoinPacket) {
            this.handleGameJoinPacket(packet);
        } else if (packet instanceof GameLeavePacket) {
            this.handleGameLeavePacket(packet);
        } else {
            throw new Error(`NO PACKET HANDLER FOR ${packet}`);
        }
    }

    handlePlayerPositionPacket(packet: PlayerPositionPacket): void {
        if (this.isNotMyPlayer(packet.playerID)) {
            const player = this.otherPlayers[packet.playerID];

            if (player) {
                player.position.x = packet.x;
                player.position.y = packet.y;
                player.setAngle(packet.angle);
            }
        }
    }

    handlePlayerBlastPacket(packet: PlayerBlastPacket): void {
        if (packet.playerID !== this.client.playerID) {
            const otherPlayer = this.otherPlayers[packet.playerID];
            if (otherPlayer) {
                otherPlayer.shootBullet();
            }
        }
    }

    handleGameInitPacket(packet: GameInitPacket): void {

        const asteroids = packet.config.asteroids;
        console.log("INIT PACKET", packet);
        this.asteroids = asteroids.map(asteroid => {
            return new Asteroid(asteroid)
        })
        this.player.positionCenterOf(this.screenWidth, this.screenHeight);
        this.initialized = true;
    }

    handleGameJoinPacket(packet: GameJoinPacket): void {
        if (this.isNotMyPlayer(packet.playerID)) {
            const existingPlayer = this.otherPlayers[packet.playerID];

            if (!existingPlayer) {
                const newPlayer = new Player(0, 0);
                this.otherPlayers[packet.playerID] = newPlayer;
                console.log(`New player joined`, packet)
            }
        }
    }

    handleGameLeavePacket(packet: GameLeavePacket): void {
        if (this.isNotMyPlayer(packet.playerID)) {
            delete this.otherPlayers[packet.playerID];
            console.log("REMOVING PLAYER");
        }
    }
}

export default NetworkGame