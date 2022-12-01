import Timeout from "./Timeout";

export default class Slide {
    container;
    elements;
    controls;
    time;
    index;
    slide;
    timeout: Timeout | null;
    pausedTimeout: Timeout | null;
    paused: boolean;

    constructor(container: Element, elements: Element[], controls: Element, time: number = 5000) {
        this.container = container;
        this.elements = elements;
        this.controls = controls;
        this.time = time;
        this.index = 0;
        this.slide = this.elements[this.index];
        this.timeout = null;
        this.pausedTimeout = null;
        this.paused = false;
        this.init();
    }

    hide(el: Element) {
        el.classList.remove('active');
    }

    show(index: number) {
        this.index = index;
        this.slide = this.elements[this.index];
        this.elements.forEach(el => this.hide(el));
        this.slide.classList.add("active");
        this.auto(this.time)
    }

    auto(time: number) {
        this.timeout?.clear();
        this.timeout = new Timeout(() => this.next(), time);
    }
    prev() {
        if (this.paused) return;
        const prev = this.index > 0 ? this.index - 1 : this.elements.length - 1;
        this.show(prev)
    };
    next() {
        if (this.paused) return;
        const next = this.index + 1 < this.elements.length ? this.index + 1 : 0;
        this.show(next)
    };

    pause() {
        console.log('teste');

        this.pausedTimeout = new Timeout(() => {
            this.timeout?.pause();
            this.paused = true;
        }, 300)
    }

    continue() {
        console.log('continue');
        this.pausedTimeout?.clear();
        if (this.paused) {
            this.paused = false;
            this.timeout?.continue();
        }
    }

    private addControls() {
        const prevButton = document.createElement('button');
        const nextButton = document.createElement('button');

        prevButton.innerText = "Slide Anterior";
        nextButton.innerText = "Próximo Slide";

        this.controls.appendChild(prevButton);
        this.controls.appendChild(nextButton);

        this.controls.addEventListener("pointerdown", () => this.pause());
        this.controls.addEventListener("pointerup", () => this.continue());


        prevButton.addEventListener("pointerup", () => this.prev())
        nextButton.addEventListener("pointerup", () => this.next())
    }

    private init() {
        this.addControls();

        this.show(this.index);
    }
}
