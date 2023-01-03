class Carousel {
    constructor(params) {
        const settings = {...{carouselID: '#carousel', slideID: '.slide', isPlaying: true, interval: 2000}, ...params}

        this.CAROUSEL = document.querySelector(settings.carouselID);
        this.SLIDES = document.querySelectorAll(settings.slideID);
        this.isPlaying = settings.isPlaying;
        this.interval = settings.interval;
    }

    _initProps() {
        this.currentSlide = 0;
        this.SLIDES_LENGTH = this.SLIDES.length;
    }

    _initControls() {
        const controls = document.createElement('div');
        controls.setAttribute('class', 'controls');

        for (let i = 0; i < 3; i++) {
            const control = document.createElement('button');
            control.setAttribute('class', 'control');

            if (i === 0) {
                control.setAttribute('id', 'pause-btn');
                control.innerHTML = 'Pause';
            }
            if (i === 1) {
                control.setAttribute('id', 'prev-btn');
                control.innerHTML = 'Prev';
            }
            if (i === 2) {
                control.setAttribute('id', 'next-btn');
                control.innerHTML = 'Next';
            }

            controls.append(control);
        }

        this.CAROUSEL.append(controls);

        this.PAUSE_BTN = document.querySelector('#pause-btn');
        this.PREV_BTN = document.querySelector('#prev-btn');
        this.NEXT_BTN = document.querySelector('#next-btn');
    }

    _initIndicators() {
        const indicators = document.createElement('ul');
        indicators.setAttribute('class', 'indicators');
        indicators.setAttribute('id', 'indicators');

        for (let i = 0; i < this.SLIDES_LENGTH; i++) {
            const indicator = document.createElement('li');
            indicator.setAttribute('class', i !== 0 ? 'indicator' : 'indicator active');
            indicator.dataset.slideTo = `${i}`;

            indicators.append(indicator);
        }

        this.CAROUSEL.append(indicators);

        this.INDICATORS_CONTAINER = document.querySelector('#indicators');
        this.INDICATORS = document.querySelectorAll('.indicator');
    }

    _goToNth(n) {
        this.SLIDES[this.currentSlide].className = 'slide';
        this.INDICATORS[this.currentSlide].className = 'indicator';
        this.currentSlide = (n + this.SLIDES_LENGTH) % this.SLIDES_LENGTH;
        this.SLIDES[this.currentSlide].className = 'slide active';
        this.INDICATORS[this.currentSlide].className = 'indicator active';
    }

    _goToNext() {
        this._goToNth(this.currentSlide + 1);
    }

    _goToPrev() {
        this._goToNth(this.currentSlide - 1);
    }

    _pausePlay() {
        this.isPlaying ? this.pause() : this.play();
    }

    _indicate(e) {
        const target = e.target;

        if (target && target.classList.contains('indicator')) {
            this.pause();
            this._goToNth(+target.dataset.slideTo);
        }
    }

    _pressKey(e) {
        if (e.code === 'Space') this._pausePlay();
        if (e.code === 'ArrowLeft') this.prev();
        if (e.code === 'ArrowRight') this.next();
    }

    _tick() {
        this.timerID = setInterval(() => this._goToNext(), this.interval);
    }

    _initListeners() {
        document.addEventListener('keydown', this._pressKey.bind(this));
        this.PAUSE_BTN.addEventListener('click', this._pausePlay.bind(this));
        this.PREV_BTN.addEventListener('click', this.prev.bind(this));
        this.NEXT_BTN.addEventListener('click', this.next.bind(this));
        this.INDICATORS_CONTAINER.addEventListener('click', this._indicate.bind(this));
    }

    play() {
        this.PAUSE_BTN.innerHTML = 'Pause';
        this.isPlaying = !this.isPlaying;
        this._tick();
    }

    pause() {
        if (this.isPlaying) {
            this.PAUSE_BTN.innerHTML = 'Play';
            this.isPlaying = !this.isPlaying;
            clearInterval(this.timerID);
        }
    }

    next() {
        this.pause();
        this._goToNext();
    }

    prev() {
        this.pause();
        this._goToPrev();
    }

    init() {
        this._initProps();
        this._initControls();
        this._initIndicators();
        this._initListeners();
        this._tick();
    }
}

export default Carousel;
