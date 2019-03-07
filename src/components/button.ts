import { Component } from "@src/component";

export class Button extends Component {
    protected element: HTMLElement;

    constructor() {
        super();
        this.element = document.createElement("button");
    }

    private initButton() {
        const { element } = this;

        element.textContent = "X";
    }
}
