import { IRenderable } from "@src/interfaces";
import { Component } from "./index";

export class Div extends Component {

    constructor(children: IRenderable[]= [],  className: string = "") {
        super(children);
        this.element = document.createElement("div");
        this.withClassname(className);
    }

}
