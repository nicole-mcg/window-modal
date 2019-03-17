import { Div } from "../components/div";

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
