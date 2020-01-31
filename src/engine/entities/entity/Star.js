import {numberBetween} from "../../../util/helpers";
import Entity from "../Entity";
import {ConstantPhysics} from "../../math/Physics";

const MAX_BLUR = 15;

class Star extends Entity {
    constructor(x: Number, y: Number, radius: Number) {
        super(x, y, ConstantPhysics(1, Math.PI / 2));
        this.radius = radius;
        this.blur = numberBetween(1, MAX_BLUR);
        this.opacity = 0;
        this.previousScreenHeight = 0;
        this.previousScreenWidth = 0;
    }

    update(screenWidth: Number, screenHeight: Number) {
        super.update(screenWidth, screenHeight);

        if (this.previousScreenHeight !== screenHeight || this.previousScreenWidth !== screenWidth) {
            this.refreshStar();
        }

        this.wrapPositionWithinBoundary(0, screenWidth, 0, screenHeight);
        this.updateStarBlur();
        if (this.starNotVisible()) {
            this.refreshStar();
        }

        this.previousScreenWidth = screenWidth;
        this.previousScreenHeight = screenHeight;
    }

    updateStarBlur() {
        this.blur += .2;
        this.blur = this.blur % MAX_BLUR;
        this.opacity -= .001;
    }

    starNotVisible() {
        return this.opacity <= 0;
    }

    refreshStar() {
        this.opacity = Math.abs(Math.random() - .3);
        this.position.x = numberBetween(0, this.screenWidth);
        this.position.y = numberBetween(0, this.screenHeight)
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);

        ctx.shadowBlur = this.blur;
        ctx.shadowColor = this.getStarShadowColor();
        ctx.fillStyle = this.getStarColor();

        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }

    getStarColor() {
        return `rgba(255,255,255,${this.opacity})`;
    }

    getStarShadowColor() {
        return `rgba(255,255,255,${this.opacity})`;
    }
}

export const buildStarFieldOfSize = (size): [Star] => {
    const stars = [];
    for (let i = 0; i < size; i++) {
        stars.push(new Star(100, 100, 2));
    }
    return stars;
};

export default Star;