import Player from "./entities/entity/Player";
import Background from "./entities/entity/Background";
import Asteroid, { generateAsteroidField } from "./entities/entity/Asteroid";
import { numberBetween, getRandomColor } from "../util/helpers";

export type GameConfigT = {
    numberOfStars: Number,
    screenWidth: Number,
    screenHeight: Number,
    baseScore: Number,
    variableScoreMin: Number,
    variableScoreMax: Number,
    maxLives: Number
};

export type CollisionResultT = {
    playerHit: Boolean,
    asteroidHit: Boolean
}

export default class Game {

    constructor(config: GameConfigT) {
        this.player = new Player(0, 0);
        this.asteroids = []
        this.background = new Background(config.numberOfStars);
        this.screenWidth = config.screenWidth;
        this.screenHeight = config.screenHeight;
        this.baseScore = config.baseScore;
        this.variableScoreMin = config.variableScoreMin;
        this.variableScoreMax = config.variableScoreMin;
        this.maxLives = config.maxLives;
        this.level = 1;
        this.initialized = false;
        this.player.positionCenterOf(this.screenWidth, this.screenHeight);
        this.player.setColor(getRandomColor());
        this.update();
    }

    getMaxLives(): Number {
        return this.maxLives;
    }

    getLevel(): Number {
        return this.level;
    }

    getPlayers(): [Player] {
        return [];
    }

    getPlayer(): Player {
        return this.player;
    }

    setScreenSize(width: Number, height: Number): void {
        this.screenWidth = width;
        this.screenHeight = height;
    }

    setAsteroids(asteroids: [Asteroid]): void {
        this.asteroids = asteroids;
    }

    isGameOver(): Boolean {
        return this.player.getLives() <= 0
    }

    isLevelCompleted(): Boolean {
        return this.asteroids.length === 0;
    }

    isInitialized(): Boolean {
        return this.initialized;
    }

    advanceLevel(): void {
        this.level += 1;
    }

    respawnPlayer(): void {
        this.player.respawn();
        this.player.positionCenterOf(this.screenWidth, this.screenHeight);
    }

    rotatePlayerLeft(): void {
        this.player.rotateLeft();
    }

    rotatePlayerRight(): void {
        this.player.rotateRight();
    }

    enablePlayerThrust(): void {
        this.player.enableThrust();
    }

    disablePlayerThrust(): void {
        this.player.disableThrust();
    }

    shootPlayerBullet(): void {
        this.player.shootBullet();
    }

    reset() {
        this.player.setScore(0);
        this.player.setLives(this.maxLives);
        this.player.respawn();
        this.level = 1;
        
    }

    exit() {

    }

    initializeLevel() {
        const baseAsteroidFieldSize = 5;
        const asteroidFieldSize = numberBetween(1, this.level) + baseAsteroidFieldSize;
        const asteroidField = generateAsteroidField(asteroidFieldSize, this.screenWidth, this.screenHeight);

        this.setAsteroids(asteroidField);
        this.player.positionCenterOf(this.screenWidth, this.screenHeight);
        this.initialized = true;
    }

    endLevel() {
        this.initialized = false;
    }

    update(): void {
        this.background.update(this.screenWidth, this.screenHeight);
        this.player.update(this.screenWidth, this.screenHeight);
        this.asteroids.forEach(e => e.update(this.screenWidth, this.screenHeight));
    }

    cleanScreen(): void {
        const asteroidsLeft = this.asteroids.filter(a => !a.shouldRemoveFromScreen());
        if (asteroidsLeft.length !== this.asteroids.length) {
            this.setAsteroids(asteroidsLeft);
        }
    }

    checkCollisions(): CollisionResultT {
        const asteroidsToCheck = this.asteroids.filter(a => !a.isExploding());
        const collision: CollisionResultT = {
            asteroidHit: false,
            playerHit: false
        };

        asteroidsToCheck.forEach(a => this.checkCollision(a, this.player, collision));

        return collision
    }

    checkCollision(asteroid: Asteroid, player: Player, collision: CollisionResultT): void {

        if (player.isAlive() && asteroid.isTouching(player)) {
            this.handlePlayerCollision();
            collision.playerHit = true;
        }

        if (player.bulletsHit(asteroid)) {
            this.handleAsteroidCollision(asteroid);

            collision.asteroidHit = true;
        }
    }

    handlePlayerCollision(): void {
        this.player.die();
    }

    handleAsteroidCollision(asteroid: Asteroid): void {

        const scoreIncrease = this.getScoreIncrease(asteroid);
        const childAsteroids = asteroid.explodeIntoPieces();
        const fullAsteroids = childAsteroids.concat(this.asteroids);

        this.player.setScore(this.player.getScore() + scoreIncrease);
        this.setAsteroids(fullAsteroids);
    }

    getScoreIncrease(asteroid: Asteroid): Number {
        return this.baseScore + this.getVariableScore(asteroid)
    };

    getVariableScore(asteroid: Asteroid): Number {
        return numberBetween(this.variableScoreMin, this.variableScoreMin) * asteroid.getLives();
    }

    draw(context: CanvasRenderingContext2D): void {
        this.background.draw(context);
        this.player.draw(context);
        this.asteroids.forEach(e => e.draw(context));
    }
}