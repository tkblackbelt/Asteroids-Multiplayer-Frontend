import Entity from "../Entity";
import {ConstantPhysics} from "../../math/Physics";

class Bullet extends Entity {

    constructor(x, y, angle) {
        super(x, y, ConstantPhysics(10, angle));
        this.radius = 5;
        this.usedUp = false;
    }

    shouldRemoveFromScreen(): boolean {
        const isNotInScreen = !this.isInsideScreen();

        return isNotInScreen || this.usedUp;
    }

    setUsedUp(): void {
        this.usedUp = true;
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);

        ctx.fillStyle = '#00ff0d';

        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}

export default Bullet;