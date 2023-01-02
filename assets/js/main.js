const CAROUSEL = document.querySelector('#carousel');
const SLIDES = document.querySelectorAll('.slide');
const PAUSE_BTN = document.querySelector('#pause-btn');
const PREV_BTN = document.querySelector('#prev-btn');
const NEXT_BTN = document.querySelector('#next-btn');
const INDICATORS_CONTAINER = document.querySelector('#indicators');
const INDICATORS = document.querySelectorAll('.indicator');

const SLIDES_LENGTH = SLIDES.length;
let currentSlide = 0;
let isPlaying = true;
let intervalID = null;
let interval = 2000;
let startPosX = null;
let endPosX = null;

const goToNth = (n) => {
    SLIDES[currentSlide].className = 'slide';
    INDICATORS[currentSlide].className = 'indicator';
    currentSlide = (n + SLIDES_LENGTH) % SLIDES_LENGTH;
    SLIDES[currentSlide].className = 'slide active';
    INDICATORS[currentSlide].className = 'indicator active';
}

const goToNext = () => goToNth(currentSlide + 1);
const goToPrev = () => goToNth(currentSlide - 1);

const play = () => {
    PAUSE_BTN.innerHTML = 'Pause';
    isPlaying = !isPlaying;
    intervalID = setInterval(goToNext, interval);
}

const pause = () => {
    if (isPlaying) {
        PAUSE_BTN.innerHTML = 'Play';
        isPlaying = !isPlaying;
        clearInterval(intervalID);
    }
}

const pausePlay = () => isPlaying ? pause() : play();

const next = () => {
    pause();
    goToNext();
}

const prev = () => {
    pause();
    goToPrev();
}

const indicate = (e) => {
    const target = e.target;

    if (target && target.classList.contains('indicator')) {
        pause();
        goToNth(+target.dataset.slideTo);
    }
}

const pressKey = (e) => {
    if (e.code === 'Space') pausePlay();
    if (e.code === 'ArrowLeft') prev();
    if (e.code === 'ArrowRight') next();
}

const swipeStart = (e) => {
    startPosX = e.changedTouches[0].clientX
}


const swipeEnd = (e) => {
    endPosX = e.changedTouches[0].clientX;

    if (endPosX - startPosX > 50) prev();
    if (endPosX - startPosX < -50) next();
}

const initListeners = () => {
    PAUSE_BTN.addEventListener('click', pausePlay);
    PREV_BTN.addEventListener('click', prev);
    NEXT_BTN.addEventListener('click', next);
    INDICATORS_CONTAINER.addEventListener('click', indicate);
    document.addEventListener('keydown', pressKey);
    CAROUSEL.addEventListener('touchstart', swipeStart);
    CAROUSEL.addEventListener('touchend', swipeEnd);
}

const init = () => {
    initListeners();
    intervalID = setInterval(goToNext, interval);
}

init();

