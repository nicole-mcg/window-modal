import { IRenderable, IStyle } from "../interfaces";

export class Component {
    protected children: IRenderable[];
    private _element?: HTMLElement;
    public get element() { return (this._element as HTMLElement); }
    public set element(element: HTMLElement) {
        this._element = element;
        this.addChildren();
    }

    constructor(children: IRenderable[]= []) {
        this.children = children;
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

        const childElement = child.element;
        if (!element || !childElement) {
            return;
        }

        element.appendChild(childElement);

        const isAlreadyChild = this.children.find((realChild) => child === realChild);
        if (!isAlreadyChild) {
            this.children.push(child);
        }
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

    private addChildren() {
        const { element } = this;

        if (!element) {
            return;
        }

        this.children.forEach((child) => {
            try {
                if (element.contains(child as any)) {
                    return;
                }
            } catch { /**/ }
            if (child instanceof HTMLElement || child instanceof Node) {
                element.appendChild(child);
                return;
            }

            if (typeof child === "string") {
                element.appendChild(document.createTextNode(child));
                return;
            }

            child.setParent(this);
        });
    }

}
