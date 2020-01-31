import Drawable from "../Drawable";
import { buildStarFieldOfSize } from "./Star";

const CLEAR_SCREEN_COLOR = '#000';
const MS_BETWEEN_UPDATES = 1000 * 5;

class Background extends Drawable {

    constructor(numberOfStars: Number) {
        super();
        this.lastUpdate = null;
        this.stars = buildStarFieldOfSize(numberOfStars);
        this.backgroundPreRender = null;
        this.previousScreenHeight = 0;
        this.previousScreenWidth = 0;
    }

    update(screenWidth: Number, screenHeight: Number): void {
        super.update(screenWidth, screenHeight);


        if (this.timeSinceLastUpdate() > MS_BETWEEN_UPDATES ||
            this.previousScreenHeight !== screenHeight || this.previousScreenWidth !== screenWidth) {
            this.stars.forEach(star => star.update(this.screenWidth, this.screenHeight));
            this.preRenderBackground();
            this.calculateNextStarUpdate();
        }

        this.previousScreenWidth = screenWidth;
        this.previousScreenHeight = screenHeight;
    }

    timeSinceLastUpdate() {
        return Date.now() - this.lastUpdate;
    }

    preRenderBackground() {
        this.backgroundPreRender = document.createElement('canvas');
        this.backgroundPreRender.width = this.screenWidth;
        this.backgroundPreRender.height = this.screenHeight;

        const ctx = this.backgroundPreRender.getContext('2d');

        this.clearScreen(ctx);
        this.stars.forEach(star => star.draw(ctx));
    }

    calculateNextStarUpdate() {
        this.lastUpdate = Date.now() - (this.lastUpdate % MS_BETWEEN_UPDATES)
    }

    clearScreen(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = CLEAR_SCREEN_COLOR;
        ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);
        if (this.backgroundPreRender) {
            ctx.drawImage(this.backgroundPreRender, 0, 0);
        }
    }
}

export default Background;