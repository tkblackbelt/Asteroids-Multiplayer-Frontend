import Entity from "../Entity";
import { DefaultPhysics } from "../../math/Physics";
import { generateExplosion } from "./Explosion";
import Blaster from "./Blaster";
import Thruster from "./Thruster";


class Player extends Entity {

    constructor(x: Number, y: Number) {
        super(x, y, DefaultPhysics());
        this.blaster = new Blaster();
        this.thruster = new Thruster();
        this.color = '#ff'
        this.lineSize = 5;
        this.radius = 9;
        this.alive = true;
        this.explosion = null;
        this.lives = 3;
        this.score = 0;
        this.name = "";
    }

    setColor(color: String): void {
        this.color = color;
    }

    getColor(): String {
        return this.color;
    }

    setLives(lives: Number): void {
        this.lives = lives;
    }

    getLives(): Number {
        return this.lives;
    }

    removeLife(): void {
        this.lives -= 1;        
    }

    setName(name: String): void {
        this.name = name;
    }

    getName(): String {
        return this.name;
    }

    setScore(score: Number) {
        this.score = score;
    }

    getScore(): Number {
        return this.score;
    }

    rotateLeft(): void {
        this.rotate(-.1);
    }

    rotateRight(): void {
        this.rotate(.1);
    }

    enableThrust(): void {
        this.setThrust(.1);
        this.thruster.addThrust(this.position.x, this.position.y, this.getOppositeAngle());
    }

    disableThrust(): void {
        this.setThrust(0);
    }

    shootBullet(): boolean {
        return this.blaster.shoot(this.position.x, this.position.y, this.getAngle());
    }

    bulletsHit(entity: Entity): boolean {
        return this.blaster.bulletsHit(entity)
    }

    respawn(): void {
        if (this.lives > 0) {
            this.alive = true;
            this.physics.setThrust(0);
            this.physics.setVelocity(0);
        }
    }

    die(): void {
        this.removeLife();
        this.explosion = generateExplosion(this.position.x, this.position.y);
        this.physics.setThrust(0);
        this.physics.setVelocity(0);
        this.alive = false;
    }

    isAlive(): boolean {
        return this.alive;
    }

    update(screenWidth: Number, screenHeight: Number) {
        super.update(screenWidth, screenHeight);

        this.wrapPositionWithinBoundary(0, screenWidth, 0, screenHeight);
        this.blaster.update(screenWidth, screenHeight);
        this.thruster.update(screenWidth, screenHeight);

        if (!this.isAlive()) {
            this.explosion.update(screenWidth, screenHeight);
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);

        if (this.isAlive()) {
            this.drawShip(ctx);
            this.thruster.draw(ctx);
        } else {
            this.explosion.draw(ctx);
        }
        this.blaster.draw(ctx);
    }

    drawShip(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineSize;

        ctx.beginPath();
        ctx.moveTo(30, 0);
        ctx.lineTo(-20, -20);
        ctx.lineTo(-20, 20);
        ctx.lineTo(30, 0);
        ctx.closePath();
        ctx.stroke();
    }
}

export default Player;