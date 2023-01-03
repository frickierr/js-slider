import Carousel from "./carousel.js";

class SwipeCarousel extends Carousel {
    _initListeners() {
        super._initListeners();
        this.CAROUSEL.addEventListener('touchstart', this._swipeStart.bind(this));
        this.CAROUSEL.addEventListener('touchend', this._swipeEnd.bind(this));
        this.CAROUSEL.addEventListener('mouseenter', this.pause.bind(this));
        this.CAROUSEL.addEventListener('mouseleave', this.play.bind(this));
    }

    _swipeStart(e) {
        this.startPosX = e.changedTouches[0].clientX
    }

    _swipeEnd(e) {
        this.endPosX = e.changedTouches[0].clientX;

        if (this.endPosX - this.startPosX > 50) this.prev();
        if (this.endPosX - this.startPosX < -50) this.next();
    }
}

export default SwipeCarousel;
