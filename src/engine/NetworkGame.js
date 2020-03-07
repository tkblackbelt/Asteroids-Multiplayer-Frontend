import Game, { GameConfigT } from './Game';
import Client from './network/Client';
import {
    Packet,
    PlayerPositionPacket,
    PlayerBlastPacket,
    GameInitPacket,
    GameJoinPacket,
    GameLeavePacket,
    PlayerDiedPacket,
    PlayerStatsUpdatePacket
} from './network/packets';
import Player from './entities/entity/Player';
import Asteroid from './entities/entity/Asteroid';
import AsteroidKilledPacket from './network/packets/AsteroidKilledPacket';
import PlayerRespawnPacket from './network/packets/PlayerRespawnPacket';
import { RESOLUTION } from '../components/Canvas';


const gameConfig: GameConfigT = {
    numberOfStars: 50,
    screenWidth: RESOLUTION.width,
    screenHeight: RESOLUTION.height,
    baseScore: 100,
    variableScoreMin: 0,
    variableScoreMax: 0,
    maxLives: 3
}

class NetworkGame extends Game {

    constructor(host: String, onPlayerUpdateCB: Function) {

        super(gameConfig);
        this.host = host;
        this.client = null;
        this.otherPlayers = {};
        this.previousPlayerUpdate = null;
        this.onPlayersUpdated = onPlayerUpdateCB;
    }

    joinGame(gameID: String, playerName: String, playerID: String): void {
        if (!this.client) {
            this.player.setName(playerName);
            this.client = new Client(gameID, playerID, this.player, this.handlePacket);
            this.client.connect(this.host);
        }
    }

    setOnPlayersUpdatedCB(fn: Function): void {
        this.onPlayersUpdated = fn;
    }

    playersUpdated(): void {
        if (this.onPlayersUpdated) {
            this.onPlayersUpdated();
        }
    }

    getPlayers(): [Player] {
        return Object.values(this.otherPlayers);
    }

    shootPlayerBullet(): void {
        super.shootPlayerBullet();
        this.client.sendPacket(new PlayerBlastPacket(this.client.getPlayerID()));
    }

    exit(): void {
        this.client.disconnect();
        // alert("BYE");
    }

    initializeLevel(): void {
        // const baseAsteroidFieldSize = 1;
        // const asteroidFieldSize = numberBetween(1, this.level) + baseAsteroidFieldSize;
        // const asteroidField = generateAsteroidField(asteroidFieldSize, this.screenWidth, this.screenHeight);

        // this.setAsteroids(asteroidField);

    }

    getScoreIncrease(asteroid: Asteroid): Number {
        return 0;
    };

    getVariableScore(asteroid: Asteroid): Number {
        return 0;
    }

    respawnPlayer(): void {
        super.respawnPlayer();
        this.client.sendPacket(new PlayerRespawnPacket(this.client.getPlayerID()));
    }

    handlePlayerCollision(): void {
        super.handlePlayerCollision();
        this.client.sendPacket(new PlayerDiedPacket(this.client.getPlayerID()));
    }

    handleAsteroidCollision(asteroid: Asteroid): void {
        const scoreIncrease = this.getScoreIncrease(asteroid);

        asteroid.explode();
        this.player.setScore(this.player.getScore() + scoreIncrease);
        this.client.sendPacket(new AsteroidKilledPacket(asteroid.id));
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
            this.client.getPlayerID(),
            player.isThrusting()
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
        } else if (packet instanceof AsteroidKilledPacket) {
            this.handleAsteroidExplodedPacket(packet);
        } else if (packet instanceof PlayerDiedPacket) {
            this.handlePlayerDiedPacket(packet);
        } else if (packet instanceof PlayerRespawnPacket) {
            this.handlePlayerRespawnPacket(packet);
        } else if (packet instanceof PlayerStatsUpdatePacket) {
            this.handlePlayerStatsUpdatePacket(packet);
        } else {
            throw new Error(`NO PACKET HANDLER FOR ${packet}`);
        }
    }

    handlePlayerPositionPacket(packet: PlayerPositionPacket): void {
        if (this.isNotMyPlayer(packet.playerID)) {
            const player = this.otherPlayers[packet.playerID];

            if (player) {
                if (packet.thrusting) {
                    player.enableThrust();
                } else {
                    player.disableThrust();
                }
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
        const asteroids = packet.asteroids;
        console.log("INITIALIZING GAME!!!!", packet);
        this.asteroids = asteroids.map(asteroid => {
            return new Asteroid(asteroid)
        })
        this.player.positionCenterOf(this.screenWidth, this.screenHeight);
        this.level = packet.level;
        this.initialized = true;
        this.playersUpdated();
    }

    handleGameJoinPacket(packet: GameJoinPacket): void {
        console.log("GAME JOIN", packet);
        if (this.isNotMyPlayer(packet.playerID)) {
            const existingPlayer = this.otherPlayers[packet.playerID];

            if (!existingPlayer) {
                const newPlayer = new Player(0, 0);
                newPlayer.setColor(packet.color);
                newPlayer.setName(packet.playerName);
                this.otherPlayers[packet.playerID] = newPlayer;
                this.playersUpdated();
            }
        }
    }

    handleGameLeavePacket(packet: GameLeavePacket): void {
        if (this.isNotMyPlayer(packet.playerID)) {
            delete this.otherPlayers[packet.playerID];
            this.playersUpdated();
        }
    }

    handleAsteroidExplodedPacket(packet: AsteroidKilledPacket): void {
        this.asteroids.forEach(asteroid => {
            if (asteroid.id === packet.asteroidID) {
                if (!asteroid.isExploding()) {
                    asteroid.explode();
                    this.playersUpdated();
                }
            }
        })
    }

    handlePlayerDiedPacket(packet: PlayerDiedPacket): void {
        if (this.isNotMyPlayer(packet.playerID)) {
            this.otherPlayers[packet.playerID].die();
            this.playersUpdated();
        }
    }

    handlePlayerRespawnPacket(packet: PlayerRespawnPacket): void {
        if (this.isNotMyPlayer(packet.playerID)) {
            const player = this.otherPlayers[packet.playerID];

            player.respawn();
            player.positionCenterOf(this.screenWidth, this.screenHeight);
            this.playersUpdated();
        }
    }

    handlePlayerStatsUpdatePacket(packet: PlayerStatsUpdatePacket): void {
        let player = null;

        if (this.isNotMyPlayer(packet.playerID)) {
            player = this.otherPlayers[packet.playerID];
        } else {
            player = this.player;
        }

        if (player) {
            player.setScore(packet.score);
            player.setLives(packet.lives);
        }
    }
}

export default NetworkGame