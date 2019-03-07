import { IStyle } from "./interfaces";

export class Component {
    protected children: Array<Component | string>;
    protected element?: HTMLElement;

    constructor(children: Array<Component | string>= []) {
        this.children = children;
    }

        // this.element.style.setProperty()

    public setElement(element: HTMLElement) {
        this.element = element;
        element.textContent = "";
        this.children.forEach((child) => {
            if (typeof child === "string") {
                element.textContent += child;
                return;
            }
            child.setParent(this);
        });
        // this.children.length = 0;
    }

    public getElement() {
        return this.element;
    }

    public setParent(parent: Component) {
        const { element } = this;

        if (!element) {
            return;
        }

        parent.addChild(this);
    }

    public addChild(child: Component) {
        const { element } = this;

        const childElement = child.getElement();
        if (!element || !childElement) {
            return;
        }

        element.appendChild(childElement);
        this.children.push(child);
    }

    public setStyle(style: IStyle) {
        const { element } = this;

        if (!element) {
            return;
        }

        Object.keys(style).forEach((prop: any) => element.style[prop] = style[prop] as any);
    }

    public setClassName(className: string) {
        const { element } = this;

        if (!element) {
            return;
        }

        element.className = className;

    }

    public classname(className?: string) {
        if (className) {
            this.setClassName(className);
            return this;
        }

        return this.element ? this.element.className : "";
    }

}
