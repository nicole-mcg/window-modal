import { Component } from "@src/component";

export class Button extends Component {
    protected element: HTMLElement = null as any;

    constructor(children: Array<Component | string>, id?: string) {
        super(children);
        this.setElement(document.createElement("button"));
        this.classname("FloatingWindow-button");

        if (id) {
            this.element.className += ` FloatingWindow-button--${id}`;
        }
    }

}
