
export class Component {
    protected element?: HTMLElement;

    public setElement(element: HTMLElement) {
        this.element = element;
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
    }

}
