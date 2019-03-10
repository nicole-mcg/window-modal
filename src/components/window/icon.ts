import { Component } from "..";
import { Div } from "../div";
import { IWindowIcon } from "./interfaces";

export class WindowIcon extends Component {

    public static createIcon(icon: IWindowIcon): HTMLElement {

        const className = " WindowModal-icon";
        if (icon.element) {

            if (icon.element.parentElement) {
                icon.element.remove();
            }

            icon.element.className += className;
            return icon.element;
        }

        if (icon.selector) {
            const element = document.querySelector(icon.selector);
            if (!element) {
                throw new Error("Could not find element for window icon: " + icon.selector);
            }

            if (element.parentElement) {
                element.remove();
            }

            element.className += className;
            return element as HTMLElement;
        }

        if (icon.innerHTML) {
            const element = new Div().element;
            element.innerHTML = icon.innerHTML;
            element.className += className;
            return element;
        }

        if (icon.src) {
            const image = new Image();
            image.src = icon.src;
            image.className += className;
            return image;
        }

        // tslint:disable-next-line:no-console
        console.warn("Invalid icon given to window: ", icon);
        const div = new Div().withClassname(className);
        return div.element;
    }

    constructor(icon: IWindowIcon) {
        super();
        this.element = WindowIcon.createIcon(icon);
    }

}
