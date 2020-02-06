import Vector2D from "./Vector2D";

const SLOW_DOWN_FACTOR_DEFAULT = .96;
const SLOW_DOWN_FACTOR_NONE = 1;

export function DefaultPhysics(slowDownFactor = SLOW_DOWN_FACTOR_DEFAULT, angle = 0, rotationSpeed = 0) {
    const velocity = Vector2D.zeroVector2D();
    const thrust = Vector2D.zeroVector2D();

    return new Physics(
        velocity,
        thrust,
        angle,
        slowDownFactor,
        rotationSpeed);
}

export function ConstantPhysics(velocityLength: Number, angle = 0, rotationSpeed = 0) {
    const velocity = Vector2D.zeroVector2D();
    const thrust = Vector2D.zeroVector2D();

    velocity.setLength(velocityLength);

    return new Physics(
        velocity,
        thrust,
        angle,
        SLOW_DOWN_FACTOR_NONE,
        rotationSpeed);
}

export function NoPhysics() {
    const velocity = Vector2D.zeroVector2D();
    const thrust = Vector2D.zeroVector2D();
    const angle = 0;
    const slowDownFactor = 1;
    const rotationSpeed = 0;

    return new Physics(
        velocity,
        thrust,
        angle,
        slowDownFactor,
        rotationSpeed
    )
}

export default class Physics {

    constructor(velocity: Vector2D,
                thrust: Vector2D,
                angle: Number,
                slowDownFactor: Number,
                rotationSpeed: Number) {

        this.velocity = velocity;
        this.thrust = thrust;
        this.slowDownFactor = slowDownFactor;
        this.angle = angle;
        this.rotationSpeed = rotationSpeed;
    }

    updateAndGetVelocity(): Vector2D {
        this.applyRotation();

        if (this.isThrusting()) {
            this.applyThrust()
        } else {
            this.applySlowDownFactor();
        }
        return this.velocity;
    }

    isThrusting(): boolean {
        return !this.thrust.isZero()
    }

    applyThrust(): void {
        this.velocity.setAngle(this.angle);
        this.thrust.setAngle(this.angle);
        this.velocity.add(this.thrust);
    }

    applySlowDownFactor(): void {
        this.velocity.setAngle(this.angle);
        this.velocity.multiply(this.slowDownFactor);
    }

    applyRotation(): void {
        this.angle += this.rotationSpeed
    }

    setThrust(thrust: Number): void {
        this.thrust.setLength(thrust);
    }

    adjustAngle(angleDelta: Number): void {
        this.setAngle(this.angle + angleDelta);
    }

    setAngle(angle: Number): void {
        this.angle = angle;
    }

    getAngle(): Number {
        return this.angle;
    }

    setVelocity(velocity: Number): void {
        this.velocity.setLength(velocity);
    }

    hasVelocity(): boolean {
        return this.velocity.length() > 1;
    }
}