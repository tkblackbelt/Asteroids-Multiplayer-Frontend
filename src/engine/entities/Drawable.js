import { RESOLUTION } from "../../components/Canvas";

class Drawable {

    constructor() {
        this.screenHeight = 0;
        this.screenWidth = 0;
    }

    /**
     * Draw the entity to the screen
     */
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.restore();
        ctx.save();
        ctx.setTransform(RESOLUTION.width / this.screenWidth, 0, 0, RESOLUTION.height / this.screenHeight, 0, 0);
    }

    /**
     * Perform any needed updates needed
     */
    update(screenWidth: Number, screenHeight: Number): void {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }
}

export default Drawable