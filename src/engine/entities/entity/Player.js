import Entity from "../Entity";
import {DefaultPhysics} from "../../math/Physics";
import {generateExplosion} from "./Explosion";
import Blaster from "./Blaster";
import Thruster from "./Thruster";


class Player extends Entity {

    constructor(x: Number, y: Number) {
        super(x, y, DefaultPhysics());
        this.blaster = new Blaster();
        this.thruster = new Thruster();
        this.color = '#f00';
        this.lineSize = 5;
        this.radius = 8;
        this.alive = true;
        this.explosion = null;
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
        this.alive = true;
        this.physics.setThrust(0);
        this.physics.setVelocity(0);
    }

    die(): void {
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
        ctx.moveTo(20, 0);
        ctx.lineTo(-20, -20);
        ctx.lineTo(-20, 20);
        ctx.lineTo(20, 0);
        ctx.closePath();
        ctx.stroke();
    }
}

export default Player;