export default class Slide {
    container;
    elements;
    controls;
    time;
    index;
    slide;
    constructor(container: Element, elements: Element[], controls: Element, time: number = 5000) {
        this.container = container;
        this.elements = elements;
        this.controls = controls;
        this.time = time;
        this.index = 0;
        this.slide = this.elements[this.index]

        this.show(this.index)
    }

    hide(el: Element) {
        el.classList.remove('active');
    }

    show(index: number) {
        this.index = index;
        this.slide = this.elements[this.index];
        this.elements.forEach(el => this.hide(el));
        this.slide.classList.add("active")
    }
}
