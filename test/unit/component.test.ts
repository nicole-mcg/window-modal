import { Component } from "@src/component";

describe("Component", () => {
    const element: any = { test: 1, appendChild: jest.fn(), style: {} };

    let component: any;

    beforeEach(() => {
        component = new Component();
        component.setElement(element);
    });

    it("can have element set", () => {
        expect(component.getElement()).toBe(element);
    });

    it("can set parent", () => {
        const parent = { addChild: jest.fn() };

        component.setParent(parent);

        expect(parent.addChild).toHaveBeenCalledWith(component);
    });

    it("can add child", () => {
        const childElement = { test: 1 };
        const child = {
            getElement: jest.fn().mockReturnValue(childElement),
            appendChild: jest.fn(),
        };

        component.addChild(child);

        expect(element.appendChild).toHaveBeenCalledWith(childElement);
    });

    it("can set style", () => {
        const style: any = { test: "style" };

        component.setStyle(style);

        expect(element.style).toEqual(style);
    });

});
