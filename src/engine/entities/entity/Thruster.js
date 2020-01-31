import Drawable from "../Drawable";
import Particle from "./Particle";


export default class Thruster extends Drawable {
    constructor() {
        super();
        this.thrusterTrails = [];
        this.thrusterVelocity = 5;
        this.thrusterRadius = 10;
    }

    addThrust(x: Number, y: Number, angle: Number): void {
        this.thrusterTrails.push(
            new Particle(x, y, '#fffff', angle, this.thrusterVelocity, this.thrusterRadius));
    }

    update(screenWidth: Number, screenHeight: Number): void {
        super.update(screenWidth, screenHeight);

        this.thrusterTrails.forEach(t => t.update(screenWidth, screenHeight));
        this.thrusterTrails = this.thrusterTrails.filter(t => !t.shouldRemoveFromScreen());
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        this.thrusterTrails.forEach(t => t.draw(ctx));
    }
}