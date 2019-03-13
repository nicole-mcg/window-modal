import { Component } from "@component";
import { Div } from "@src/components/div";
import { IRenderable } from "@src/interfaces";

export class MinimizeBar extends Div {

    constructor(element?: HTMLElement) {
        super();
        if (element) {
            this.element = element;
        }
        this.element.id = "WindowModal-minimizeBar";
        this.withClassname(this.element.id);
    }

}
