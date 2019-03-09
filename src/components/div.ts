import { Component } from "@component";
import { IRenderable } from "@src/interfaces";

export class Div extends Component {

    constructor(children: IRenderable[]= [],  className: string = "") {
        super(children);
        this.element = document.createElement("div");
        this.classname(className);
    }

}
