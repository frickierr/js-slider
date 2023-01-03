function SwipeCarousel() {
    Carousel.apply(this, arguments);
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype._initListeners = function () {
    Carousel.prototype._initListeners.apply(this);
    this.CAROUSEL.addEventListener('touchstart', this._swipeStart.bind(this));
    this.CAROUSEL.addEventListener('touchend', this._swipeEnd.bind(this));
}

SwipeCarousel.prototype._swipeStart = function (e) {
    this.startPosX = e.changedTouches[0].clientX
}

SwipeCarousel.prototype._swipeEnd = function (e) {
    this.endPosX = e.changedTouches[0].clientX;

    if (this.endPosX - this.startPosX > 50) this.prev();
    if (this.endPosX - this.startPosX < -50) this.next();
}