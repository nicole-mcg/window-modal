import { Component } from "@src/component";

export class Div extends Component {
    protected element: HTMLElement = null as any;

    constructor(children: Array<Component | string>= [],  className: string = "") {
        super(children);
        this.setElement(document.createElement("div"));
        this.classname(className);
    }

}
