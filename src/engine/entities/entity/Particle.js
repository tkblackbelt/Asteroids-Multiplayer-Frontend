import Entity from "../Entity";
import {ConstantPhysics} from "../../math/Physics";

class Particle extends Entity {

    constructor(x: Number, y: Number, color, angle, velocity, radius) {
        super(x, y, ConstantPhysics(velocity, angle));
        this.color = color;
        this.opacity = 1;
        this.radius = radius;
    }

    update(screenWidth: Number, screenHeight: Number) {
        super.update(screenWidth, screenHeight);
        this.opacity *= .9;
        this.radius *= .9;
    }

    shouldRemoveFromScreen(): boolean {
        return !this.hasVelocity() || !this.isInsideScreen();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);

        ctx.strokeStyle = `rgba(255,255,255, ${this.opacity})`;
        ctx.lineWidth = 5;

        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    }
}

export default Particle;