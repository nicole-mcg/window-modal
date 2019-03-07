
export class Button {
    private element: HTMLElement;

    constructor() {
        this.element = document.createElement("button");
    }

    private initButton() {
        const { element } = this;

        element.textContent = "X";
    }
}
