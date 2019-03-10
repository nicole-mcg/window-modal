import { Component } from "@component";
import { IRenderable } from "@src/interfaces";

export class Button extends Component {

    constructor(children: IRenderable[], id?: string) {
        super(children);
        this.element = document.createElement("button");
        this.withClassname("WindowModal-button");

        if (id) {
            this.element.className += ` WindowModal-button--${id}`;
        }
    }

}
