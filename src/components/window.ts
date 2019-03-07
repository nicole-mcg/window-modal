import { Component } from "@src/component";
import { Button } from "./button";
import { Div } from "./div";

export class FloatingWindow extends Component {
    protected element: HTMLElement;
    protected minimizeButton: Button;
    protected closeButton: Button;

    constructor(elementSelector?: string) {
        super();
        this.element = (elementSelector && document.querySelector(elementSelector)) || document.createElement("div");
        this.element.className = "FloatingWindow";

        const windowBar = new Div("FloatingWindow-bar");

        this.minimizeButton = this.createButton("_", windowBar);
        this.closeButton = this.createButton("X", windowBar);

        this.addChild(windowBar);
    }

    private createButton(text: string, parent: Component= this): Button {
        const button = new Button(text);
        parent.addChild(button);
        return button;
    }

    // private create

}
