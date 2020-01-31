import Drawable from "../Drawable";
import Bullet from "./Bullet";
import Entity from "../Entity";

const BULLET_FIRE_PER_SECOND_INTERVAL = 1000 / 5;

export default class Blaster extends Drawable {
    constructor() {
        super();
        this.bullets = [];
        this.lastShot = Date.now();
    }

    bulletsHit(entity: Entity): boolean {
        for (let i = 0; i < this.bullets.length; i++) {
            if (this.bullets[i].isTouching(entity)) {
                this.bullets[i].setUsedUp();
                return true;
            }
        }
        return false;
    }

    shoot(x: Number, y: Number, angle: Number): boolean {
        if (this.timeSinceLastShot() > BULLET_FIRE_PER_SECOND_INTERVAL) {
            this.bullets.push(new Bullet(x, y, angle));
            this.calculateNextAllowedShot();
            return true;
        }
        return false;
    }

    timeSinceLastShot() {
        return Date.now() - this.lastShot;
    }

    calculateNextAllowedShot() {
        this.lastShot = Date.now() - (this.lastShot % BULLET_FIRE_PER_SECOND_INTERVAL)
    }

    update(screenWidth: Number, screenHeight: Number): void {
        super.update(screenWidth, screenHeight);
        this.bullets.forEach(b => b.update(screenWidth, screenHeight));
        this.bullets = this.bullets.filter(bullet => !bullet.shouldRemoveFromScreen());
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        this.bullets.forEach(b => b.draw(ctx));
    }
}