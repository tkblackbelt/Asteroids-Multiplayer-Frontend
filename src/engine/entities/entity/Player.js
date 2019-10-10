import Entity from "../Entity";
import Bullet from "./Bullet";
import {DefaultPhysics} from "../../math/Physics";
import Particle from "./Particle";

import {generateExplosion} from "./Explosion";
import Blaster from "./Blaster";


class Player extends Entity {

    constructor(x: Number, y: Number) {
        super(x, y, DefaultPhysics());
        this.thrusterTrails = [];
        this.blaster = new Blaster();
        this.color = '#f00';
        this.lineSize = 5;
        this.radius = 8;
        this.dead = false;
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
        this.thrusterTrails.push(this.generateThrusterParticle());
    }

    disableThrust(): void {
        this.setThrust(0);
    }

    shootBullet(): void {
        this.blaster.shoot(this.position.x, this.position.y, this.getAngle());
    }

    bulletsHit(entity: Entity): boolean {
        return this.blaster.bulletsHit(entity)
    }

    generateThrusterParticle(): Particle {
        return new Particle(
            this.position.x,
            this.position.y,
            '#fffff',
            this.getOppositeAngle(),
            5,
            10)
    }

    die(): void {
        this.explosion = generateExplosion(this.position.x, this.position.y);
        this.dead = true;
    }

    isDead(): boolean {
        return this.dead;
    }

    update(screenWidth: Number, screenHeight: Number) {
        super.update(screenWidth, screenHeight);

        this.wrapPositionWithinBoundary(0, screenWidth, 0, screenHeight);
        this.blaster.update(screenWidth, screenHeight);
        this.thrusterTrails = this.updateAndDropChildren(this.thrusterTrails, screenWidth, screenHeight);

        if (this.isDead()) {
            this.explosion.update(screenWidth, screenHeight);
        }
    }

    updateAndDropChildren(children: [Entity], screenWidth: Number, screenHeight: Number): [] {
        children.forEach(c => c.update(screenWidth, screenHeight));
        return children.filter(c => !c.shouldRemoveFromScreen());
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        this.drawShip(ctx);
        this.blaster.draw(ctx);
        this.drawChildren(this.thrusterTrails, ctx);
    }

    drawShip(ctx: CanvasRenderingContext2D): void {

        if (this.isDead()) {
            this.explosion.draw(ctx);
        } else {
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

    drawChildren(children: [Entity], ctx: CanvasRenderingContext2D): void {
        children.forEach(c => c.draw(ctx));
    }
}

export default Player;