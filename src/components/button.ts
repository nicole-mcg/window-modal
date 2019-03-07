import { Component } from "@src/component";
import { IRenderable } from "@src/interfaces";

export class Button extends Component {
    protected element: HTMLElement = null as any;

    constructor(children: IRenderable[], id?: string) {
        super(children);
        this.setElement(document.createElement("button"));
        this.classname("FloatingWindow-button");

        if (id) {
            this.element.className += ` FloatingWindow-button--${id}`;
        }
    }

}
