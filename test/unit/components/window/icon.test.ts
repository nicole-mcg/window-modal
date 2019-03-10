import { Div } from "@src/components/div";
import { WindowIcon } from "@src/components/window/icon";

// tslint:disable:no-console
describe("WindowIcon", () => {

    beforeAll(() => {
        document.querySelector = jest.fn();
        console.warn = jest.fn();
    });

    it("can be created with an element", () => {
        const element = new Div(["test"]).element;
        const iconObj = { element };

        const icon = new WindowIcon(iconObj);

        expect(icon.element).toBe(element);
    });

    it("can be created with a selector", () => {
        const element = new Div(["test"]).element;
        (document.querySelector as any).mockReturnValue(element);
        const selector = "#anything";
        const iconObj = { selector };

        const icon = new WindowIcon(iconObj);

        expect(icon.element).toBe(element);
        expect(document.querySelector).toHaveBeenCalledWith(selector);
    });

    it("can be created with innerHTML", () => {
        const innerHTML = "test html";
        const iconObj = { innerHTML };

        const icon = new WindowIcon(iconObj);

        const expectedElement = new Div([innerHTML]).element;
        expect(icon.element).toEqual(expectedElement);
    });

    it("can be created with src", () => {
        const src = "test html";
        const iconObj = { src };

        const icon = new WindowIcon(iconObj);

        const expectedImage = new Image();
        expectedImage.src = src;
        expect(icon.element).toEqual(expectedImage);
    });

    it("will print a warning if no options", () => {
        const iconObj = {};

        const icon = new WindowIcon(iconObj);

        expect(icon.element).toEqual(new Div().element);
        expect(console.warn).toHaveBeenCalled();
    });

});
// tslint:enable:no-console

