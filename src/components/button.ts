import { Component } from "@src/component";

export class Button extends Component {
    protected element: HTMLElement;

    constructor(text?: string, id?: string) {
        super();
        this.element = document.createElement("button");
        this.element.className = "FloatingWindow-button";

        if (id) {
            this.element.className += ` FloatingWindow-button--${id}`;
        }

        this.element.textContent = text || "";
    }

}
