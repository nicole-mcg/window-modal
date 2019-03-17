import { IRenderable } from "../interfaces";
import { Component } from "./index";

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
