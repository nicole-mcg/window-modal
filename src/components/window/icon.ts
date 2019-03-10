import { Component } from "..";
import { Div } from "../div";
import { IWindowIcon } from "./interfaces";

export class WindowIcon extends Component {

    public static createIcon(icon: IWindowIcon): HTMLElement {

        if (icon.element) {
            return icon.element;
        }

        if (icon.selector) {
            const element = document.querySelector(icon.selector);
            if (!element) {
                throw new Error("Could not find element for window icon: " + icon.selector);
            }
            return element as HTMLElement;
        }

        if (icon.innerHTML) {
            const element = new Div().element;
            element.innerHTML = icon.innerHTML;
            return element;
        }

        if (icon.src) {
            const image = new Image();
            image.src = icon.src;
            return image;
        }

        // tslint:disable-next-line:no-console
        console.warn("Invalid icon given to window: ", icon);
        return new Div().element;
    }

    constructor(icon: IWindowIcon) {
        super();
        this.element = WindowIcon.createIcon(icon);
    }

}
