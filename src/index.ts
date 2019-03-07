
export class FloatingWindow {
    private element: HTMLElement;

    constructor(elementSelector?: string) {
        this.element = (elementSelector && document.querySelector(elementSelector)) || document.createElement("div");
    }

}
