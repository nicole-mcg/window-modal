import { Component } from "@component";
import { Div } from "@src/components/div";
import { WindowModal } from "@src/components/window";
import * as resize from "@src/components/window/resize-handler";
import * as bar from "@src/components/window/window-bar";
import { addPx } from "@src/util";
import { createEventStub } from "./test-util";

describe("WindowModal", () => {
    const title = "test title";
    const windowBar = {
        destroy: jest.fn(),
        clearMouseState: jest.fn(),
        onMouseMove: jest.fn(),
        moving: false,
        minimize: jest.fn(),
        maximize: jest.fn(),
    };
    const resizeHandler = {
        clearMouseState: jest.fn(),
        onMouseMove: jest.fn(),
        resizing: false,
    };

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
        const options: any = { title, test: 1 };
        const windowModal: any = new WindowModal(options);
        expect(windowModal).toBeTruthy();

        const element = windowModal.element;
        const expectedElement = (
            new Div([
                new Div([""]).withClassname("WindowModal-content"),
            ]).withClassname("WindowModal")
        );
        const { pos, size } = windowModal;
        expectedElement.setStyle({
            zIndex: "1",
            left: addPx(pos.x), top: addPx(pos.y),
            width: addPx(size.x), height: addPx(size.y),
        });
        expect(element).toEqual(expectedElement.element);

        expect(resize.WindowResizeHandler).toHaveBeenCalledWith(windowModal);

        expect(bar.WindowBar).toHaveBeenCalledWith({ window: windowModal, ...options });

        expect(windowModal.content.children).toEqual([""]);

        expect(window.addEventListener).toHaveBeenCalledWith("mouseup", windowModal.onMouseUp);
        expect(window.addEventListener).toHaveBeenCalledWith("mousemove", windowModal.onMouseMove);
        expect(window.addEventListener).toHaveBeenCalledWith("select", windowModal.onSelectStart);
        expect(window.addEventListener).toHaveBeenCalledWith("mouseenter", windowModal.onMouseEnter);
    });

    it("can be created with a selector", () => {
        const contentEle = new Div().element;
        contentEle.innerHTML = "test";
        (document.querySelector as any).mockReturnValue(contentEle.cloneNode(true));
        const query = "#content-ele";
        const windowModal: any = new WindowModal({ title, elementSelector: query });
        expect(windowModal).toBeTruthy();

        const expectedElement = (
            new Div([
                new Div([
                    new Div([ contentEle ]),
                ]).withClassname("WindowModal-content"),
            ]).withClassname("WindowModal")
        );

        const { pos, size } = windowModal;
        expectedElement.setStyle({
            zIndex: "1",
            left: addPx(pos.x), top: addPx(pos.y),
            width: addPx(size.x), height: addPx(size.y),
        });
        expect(windowModal.element).toEqual(expectedElement.element);
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

    it("can have initial size", () => {
        const size = {
            x: 450,
            y: 600,
        };
        const options: any = { title, size };
        const windowModal: any = new WindowModal(options);
        expect(windowModal.size).toEqual(size);
    });

    it("can have initial pos", () => {
        const pos = {
            x: 450,
            y: 600,
        };
        const options: any = { title, pos };
        const windowModal: any = new WindowModal(options);
        expect(windowModal.pos).toEqual(pos);
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
        expect(windowBar.minimize).toHaveBeenCalled();
    });

    it("can be maximized", (done) => {
        windowModal.setStyle = jest.fn();
        windowModal.maximize(done);
        expect(windowModal.setStyle).toHaveBeenCalledWith({ bottom: null });

        setTimeout(() => {
            expect(windowModal.minimized).toBe(false);
            expect(windowBar.maximize).toHaveBeenCalled();
            done();
        }, 700);
    });

    it("can clear mouse state", () => {
        windowModal.clearMouseState();
        expect(windowBar.clearMouseState).toHaveBeenCalled();
        expect(resizeHandler.clearMouseState).toHaveBeenCalled();
    });

    it("will clear mouse state on mouse enter (if no buttons held down)", () => {
        const event  = {
            buttons: 1,
        };
        windowModal.clearMouseState = jest.fn();

        windowModal.onMouseEnter(event);
        expect(windowModal.clearMouseState).not.toHaveBeenCalled();

        event.buttons = 0;
        windowModal.onMouseEnter(event);
        expect(windowModal.clearMouseState).toHaveBeenCalled();
    });

    it("will clear mouse state on mouse up", () => {
        windowModal.clearMouseState = jest.fn();
        windowModal.onMouseUp();
        expect(windowModal.clearMouseState).toHaveBeenCalled();
    });

    it("will stop selection while moving or resizing", () => {
        const event = createEventStub();

        windowModal.onSelectStart(event);
        expect(event.preventDefault).not.toHaveBeenCalled();

        windowBar.moving = true;
        windowModal.onSelectStart(event);
        expect(event.preventDefault).toHaveBeenCalled();

        windowBar.moving = true;
        event.preventDefault.mockClear();

        resizeHandler.resizing = true;
        windowModal.onSelectStart(event);
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it("will record mouse pos and pass event to bar and resize handler", () => {
        const event = {
            pageX: 123,
            pageY: 321,
        };

        windowModal.onMouseMove(event);

        expect(windowModal.mousePos).toEqual({
            x: event.pageX,
            y: event.pageY,
        });

        expect(windowBar.onMouseMove).toHaveBeenCalledWith(event);
        expect(resizeHandler.onMouseMove).toHaveBeenCalledWith(event);
    });

});
