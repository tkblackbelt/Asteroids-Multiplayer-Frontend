import Vector2D from "../math/Vector2D";
import Drawable from "./Drawable";
import Physics from "../math/Physics";

class Entity extends Drawable {

    constructor(x: Number, y: Number, physics: Physics) {
        super();
        this.position = new Vector2D(x, y);
        this.physics = physics;
        this.radius = 0;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.getAngle());
    }

    update(screenWidth: Number, screenHeight: Number): void {
        super.update(screenWidth, screenHeight);
        this.updatePhysics();
    }

    updatePhysics(): void {
        this.position.add(this.physics.updateAndGetVelocity());
    }

    positionCenterOf(width: Number, height: Number): void {
        this.position.x = width / 2;
        this.position.y = height / 2;
    }

    rotate(delta: Number): void {
        this.physics.adjustAngle(delta)
    }

    getOppositeAngle(): Number {
        return this.physics.getAngle() + Math.PI;
    }

    setThrust(thrust: Number): void {
        this.physics.setThrust(thrust);
    }

    setVelocity(velocity: Number): void {
        this.physics.setVelocity(velocity);
    }

    setAngle(angle: Number): Number {
        this.physics.setAngle(angle)
    }

    getAngle(): Number {
        return this.physics.getAngle();
    }

    hasVelocity(): Boolean {
        return this.physics.hasVelocity();
    }

    shouldRemoveFromScreen(): boolean {
        return false
    }

    wrapPositionWithinBoundary(minX: Number, maxX: Number, minY: Number, maxY: Number) {
        if (this.position.x + this.radius < minX) {
            this.position.x = maxX;
        } else if (this.position.x - this.radius > maxX) {
            this.position.x = minX;
        }

        if (this.position.y + this.radius < minY) {
            this.position.y = maxY;
        } else if (this.position.y - this.radius > maxY) {
            this.position.y = minY;
        }
    }

    isInsideScreen() {
        return this.position.x + this.radius >= 0 &&
            this.position.x - this.radius <= this.screenWidth &&
            this.position.y + this.radius >= 0 &&
            this.position.y - this.radius <= this.screenHeight;
    }

    isTouching(entity: Entity): boolean {
        const vx = this.position.x - entity.position.x;
        const vy = this.position.y - entity.position.y;
        const vec = new Vector2D(vx, vy);

        return vec.length() < this.radius + entity.radius;
    }
}


export default Entity