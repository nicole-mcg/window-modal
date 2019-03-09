import { Component } from "@component";
import { Button } from "@components/button";
import { Div } from "@src/components/div";
import { WindowModal } from "@src/components/window";
import * as resize from "@src/components/window/resize-handler";
import * as bar from "@src/components/window/window-bar";
import { addPx } from "@src/util";

describe("WindowModal", () => {
    const title = "test title";
    const windowBar = {
        destroy: jest.fn(),
    };
    const resizeHandler = { test: 1 };

    let windowModal: any;

    beforeEach(() => {
        windowModal = new WindowModal({ title });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        document.querySelector = jest.fn();
        window.addEventListener = jest.fn();
        window.removeEventListener = jest.fn();
        (bar.WindowBar as any) = jest.fn().mockImplementation(() => windowBar);
        (resize.WindowResizeHandler as any) = jest.fn().mockImplementation(() => resizeHandler);
    });

    it("can be created without a selector", () => {
        expect(windowModal).toBeTruthy();

        const element = windowModal.element;
        const expectedElement = (
            new Div([
                new Div([""]).classname("WindowModal-content"),
            ]).classname("WindowModal") as Div
        );
        const { pos, size } = windowModal;
        expectedElement.setStyle({
            zIndex: "1",
            left: addPx(pos.x), top: addPx(pos.y),
            width: addPx(size.x), height: addPx(size.y),
        });
        expect(element).toEqual(expectedElement.element);

        expect(resize.WindowResizeHandler).toHaveBeenCalledWith(windowModal);

        expect(bar.WindowBar).toHaveBeenCalledWith({ title, window: windowModal });

        expect(windowModal.content.children).toEqual([""]);

        expect(window.addEventListener).toHaveBeenCalledWith("mouseup", windowModal.onMouseUp);
        expect(window.addEventListener).toHaveBeenCalledWith("mousemove", windowModal.onMouseMove);
        expect(window.addEventListener).toHaveBeenCalledWith("select", windowModal.onSelectStart);
        expect(window.addEventListener).toHaveBeenCalledWith("mouseenter", windowModal.onMouseEnter);
    });

    it("can be created with a selector", () => {
        const contentEle = new Div(["test"]).element;
        (document.querySelector as any).mockReturnValue(contentEle);
        const query = "#content-ele";
        const windowModal: any = new WindowModal({ title, elementSelector: query });
        expect(windowModal).toBeTruthy();

        const element = windowModal.element;
        const expectedElement = (
            new Div([
                new Div([
                    new Component([contentEle]),
                ]).classname("WindowModal-content"),
            ]).classname("WindowModal") as Div
        );

        const { pos, size } = windowModal;
        expectedElement.setStyle({
            zIndex: "1",
            left: addPx(pos.x), top: addPx(pos.y),
            width: addPx(size.x), height: addPx(size.y),
        });
        expect(element).toEqual(expectedElement.element);
    });

    it("can be destroyed", () => {
        document.body.appendChild(windowModal.element);

        windowModal.destroy();

        expect(window.removeEventListener).toHaveBeenCalledWith("mouseup", windowModal.onMouseUp);
        expect(window.removeEventListener).toHaveBeenCalledWith("mousemove", windowModal.onMouseMove);
        expect(window.removeEventListener).toHaveBeenCalledWith("select", windowModal.onSelectStart);
        expect(window.removeEventListener).toHaveBeenCalledWith("mouseenter", windowModal.onMouseEnter);
        expect(windowModal.windowBar.destroy).toHaveBeenCalled();
        expect(document.contains(windowModal.element)).toBe(false);
    });

    it("can be minimized", () => {
        windowModal.setStyle = jest.fn();
        windowModal.minimize();
        expect(windowModal.setStyle).toHaveBeenCalledWith({
            transition: "all 0.5s ease",
            width: "200px", height: "25px",
            left: "0px", top: "0px",
        });
        expect(windowModal.minimized).toBe(true);
    });

    it("can be maximized", (done) => {
        windowModal.setStyle = jest.fn();
        windowModal.maximize(done);
        expect(windowModal.setStyle).toHaveBeenCalledWith({ bottom: null });
        expect(windowModal.minimized).toBe(false);
    });

});
