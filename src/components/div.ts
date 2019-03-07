import { Component } from "@src/component";
import { IRenderable } from "@src/interfaces";

export class Div extends Component {
    protected element: HTMLElement = null as any;

    constructor(children: IRenderable[]= [],  className: string = "") {
        super(children);
        this.setElement(document.createElement("div"));
        this.classname(className);
    }

}
