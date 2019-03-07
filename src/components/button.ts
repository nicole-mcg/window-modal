import { Component } from "@src/component";

export class Button extends Component {
    protected element: HTMLElement;

    constructor(text?: string) {
        super();
        this.element = document.createElement("button");
        this.element.className = "FloatingWindow-button";

        this.element.textContent = text || "";
    }

}
