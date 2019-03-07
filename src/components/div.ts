import { Component } from "@src/component";

export class Div extends Component {
    protected element: HTMLElement;

    constructor(className?: string) {
        super();
        this.element = document.createElement("div");
        this.element.className = className || "";
    }
}
