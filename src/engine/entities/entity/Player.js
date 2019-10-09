import Entity from "../Entity";
import Bullet from "./Bullet";
import {DefaultPhysics} from "../../math/Physics";
import Particle from "./Particle";
import {playBlaster} from "../../manager/AudioManager";


class Player extends Entity {

    constructor(x: Number, y: Number) {
        super(x, y, DefaultPhysics());
        this.thrusterTrails = [];
        this.bullets = [];
        this.color = '#f00';
        this.lineSize = 5;
        this.radius = 8
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
        playBlaster();
        this.bullets.push(new Bullet(this.position.x, this.position.y, this.getAngle()));
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
    
    }

    update(screenWidth: Number, screenHeight: Number) {
        super.update(screenWidth, screenHeight);

        this.wrapPositionWithinBoundary(0, screenWidth, 0, screenHeight);
        this.thrusterTrails = this.updateAndDropChildren(this.thrusterTrails, screenWidth, screenHeight);
        this.bullets = this.updateAndDropChildren(this.bullets, screenWidth, screenHeight);
    }

    updateAndDropChildren(children: [Entity], screenWidth: Number, screenHeight: Number): [] {
        children.forEach(c => c.update(screenWidth, screenHeight));
        return children.filter(c => !c.shouldRemoveFromScreen());
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        this.drawShip(ctx);
        this.drawChildren(this.thrusterTrails, ctx);
        this.drawChildren(this.bullets, ctx);
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

    drawChildren(children: [Entity], ctx: CanvasRenderingContext2D): void {
        children.forEach(c => c.draw(ctx));
    }
}

export default Player;