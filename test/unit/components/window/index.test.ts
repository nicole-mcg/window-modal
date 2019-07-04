import { Div } from "@src/components/div";
import { WindowModal } from "@src/components/window";
import * as resize from "@src/components/window/resize-handler";
import * as bar from "@src/components/window/window-bar";
import { WindowModalBlurEvent } from "@src/events/blur";
import { WindowModalCloseEvent } from "@src/events/close";
import { WindowModalFocusEvent } from "@src/events/focus";
import { WindowModalMinimizeEvent } from "@src/events/minimize";
import { WindowModalMoveEvent } from "@src/events/move";
import { WindowModalResizeEvent } from "@src/events/resize";
import { WindowModalUnminimizeEvent } from "@src/events/unminimize";
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
        unminimize: jest.fn(),
        setTitle: jest.fn(),
        setIcon: jest.fn(),
        setCompact: jest.fn(),
        setHideClose: jest.fn(),
        setHideMinimize: jest.fn(),
    };
    const resizeHandler = {
        clearMouseState: jest.fn(),
        onMouseMove: jest.fn(),
        resizing: false,
    };

    let windowModal: any;

    beforeEach(() => {
        windowModal = new WindowModal({ title });
        windowModal.element.dispatchEvent = jest.fn().mockReturnValue(true);
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
                new Div().withClassname("WindowModal-content"),
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

        expect(windowModal.content.children).toEqual([]);
        expect(windowModal.content.element.children).toHaveLength(0);

        expect(window.addEventListener).toHaveBeenCalledWith("mouseup", windowModal.onMouseUp);
        expect(window.addEventListener).toHaveBeenCalledWith("mousemove", windowModal.onMouseMove);
        expect(window.addEventListener).toHaveBeenCalledWith("select", windowModal.onSelectStart);
        expect(window.addEventListener).toHaveBeenCalledWith("mouseenter", windowModal.onMouseEnter);
    });

    it("can be created with a selector", () => {
        const contentEle = new Div(["test"]);
        (document.querySelector as any).mockReturnValueOnce(new Div().element); // for minimize bar
        (document.querySelector as any).mockReturnValue(contentEle.element.cloneNode(true));
        const query = "#content-ele";
        const windowModal: any = new WindowModal({ title, elementSelector: query });
        expect(windowModal).toBeTruthy();

        const expectedElement = (
            new Div([
                new Div([ contentEle ]).withClassname("WindowModal-content"),
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

    it("will throw error on invalid selector", () => {
        const elementSelector = {};
        const options: any = { title, elementSelector };
        expect(() => new WindowModal(options)).toThrow();
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

    it("will throw error on invalid initial pos", () => {
        const pos = "invalid";
        const options: any = { title, pos };
        expect(() => new WindowModal(options)).toThrow();
    });

    it("can take option 'resizable'", () => {
        const resizable = false;
        const options: any = { title, resizable };
        const windowModal: any = new WindowModal(options);
        expect(windowModal.resizable).toBe(resizable);
    });

    it("won't set resizable false for undefined", () => {
        const options: any = { title };
        const windowModal: any = new WindowModal(options);
        expect(windowModal.resizable).toBe(true);
    });

    it("can take option 'movable'", () => {
        const movable = false;
        const options: any = { title, movable };
        const windowModal: any = new WindowModal(options);
        expect(windowModal.movable).toBe(movable);
    });

    it("won't set resizable and movable to false for undefined", () => {
        const options: any = { title };
        const windowModal: any = new WindowModal(options);
        expect(windowModal.resizable).toBe(true);
        expect(windowModal.movable).toBe(true);
    });

    it("can set title ", () => {
        const newTitle = "test";
        windowModal.title = newTitle;
        expect(windowBar.setTitle).toHaveBeenCalledWith(newTitle);
    });

    it("can set icon", () => {
        const newIcon = {};
        windowModal.icon = newIcon;
        expect(windowBar.setIcon).toHaveBeenCalledWith(newIcon);
    });

    it("can set compact", () => {
        const compact = true;
        windowModal.compact = compact;
        expect(windowBar.setCompact).toHaveBeenCalledWith(compact);
    });

    it("can set hideClose", () => {
        const hideClose = true;
        windowModal.hideClose = hideClose;
        expect(windowBar.setHideClose).toHaveBeenCalledWith(hideClose);
    });

    it("can set icon ", () => {
        const hideMinimize = true;
        windowModal.hideMinimize = hideMinimize;
        expect(windowBar.setHideMinimize).toHaveBeenCalledWith(hideMinimize);
    });

    it("will throw error on invalid initial title", () => {
        const title = {};
        const options: any = { title };
        expect(() => new WindowModal(options)).toThrow();
    });

    it("can be minimized", (done) => {
        windowModal.setStyle = jest.fn();
        windowModal.minimize();
        expect(windowModal.setStyle).toHaveBeenCalledWith({
            transition: "all 0.5s ease",
            width: "200px", height: "30px",
            left: "0px", top: "0px",
        });
        expect(windowModal.minimized).toBe(true);
        expect(windowBar.minimize).toHaveBeenCalled();

        setTimeout(() => {
            expect(windowModal.element.parentElement).toBe(windowModal.minimizeBar.element);
            done();
        }, 1000);
    });

    it("can be unminimized", (done) => {
        windowModal.setStyle = jest.fn();
        document.body.removeChild(windowModal.element);
        windowModal.minimizeBar.element.appendChild(windowModal.element);
        windowModal.unminimize(done);

        setTimeout(() => {
            expect(windowModal.minimized).toBe(false);
            expect(windowBar.unminimize).toHaveBeenCalled();
            done();
        }, 1000);
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

    it("will dispatch close event", () => {
        windowModal.destroy();
        const event = new WindowModalCloseEvent(windowModal);
        expect(windowModal.element.dispatchEvent)
            .toHaveBeenCalledWith(event);
    });

    it("will dispatch minimize event", () => {
        windowModal.minimize();
        const event = new WindowModalMinimizeEvent(windowModal);
        expect(windowModal.element.dispatchEvent)
            .toHaveBeenCalledWith(event);
    });

    it("will dispatch unminimize event", () => {
        document.body.removeChild(windowModal.element);
        windowModal.minimizeBar.element.appendChild(windowModal.element);
        windowModal.unminimize();
        const event = new WindowModalUnminimizeEvent(windowModal);
        expect(windowModal.element.dispatchEvent)
            .toHaveBeenCalledWith(event);
    });

    it("will dispatch focus event", () => {
        windowModal.focused = false;
        windowModal.focused = true;
        const event = new WindowModalFocusEvent(windowModal);
        expect(windowModal.element.dispatchEvent)
            .toHaveBeenCalledWith(event);
    });

    it("will dispatch blur event", () => {
        windowModal.focused = false;
        const event = new WindowModalBlurEvent(windowModal);
        expect(windowModal.element.dispatchEvent)
            .toHaveBeenCalledWith(event);
    });

    it("will dispatch move event", () => {
        const oldPos = windowModal.pos;
        windowModal.pos = { x: 1, y: 1 };
        const event = new WindowModalMoveEvent(windowModal, oldPos, windowModal.pos);
        expect(windowModal.element.dispatchEvent)
            .toHaveBeenCalledWith(event);
    });

    it("will dispatch resize event", () => {
        const oldSize = windowModal.size;
        const newSize = { x: 500, y: 600 };
        windowModal.size = newSize;
        const event = new WindowModalResizeEvent(windowModal, oldSize, newSize);
        expect(windowModal.element.dispatchEvent)
            .toHaveBeenCalledWith(event);
    });

    it("can prevent minimize event", () => {
        windowModal.element.dispatchEvent
            .mockReturnValue(false);
        windowModal.minimize();
        expect(windowModal.minimized).toBe(false);
    });

    it("can prevent unminimize event", () => {
        windowModal.minimize();
        windowModal.element.dispatchEvent
            .mockReturnValue(false);
        windowModal.unminimize();
        expect(windowModal.minimized).toBe(true);
    });

    it("can prevent focus event", () => {
        windowModal.focused = false;
        windowModal.element.dispatchEvent
            .mockReturnValue(false);
        windowModal.focused = true;
        expect(windowModal.focused).toBe(false);
    });

    it("can prevent blur event", () => {
        windowModal.element.dispatchEvent
            .mockReturnValue(false);
        windowModal.focused = false;
        expect(windowModal.focused).toBe(true);
    });

    it("can prevent move event", () => {
        windowModal.element.dispatchEvent
            .mockReturnValue(false);
        const oldPos = windowModal.pos;
        windowModal.pos = { x: 1, y: 1 };
        expect(windowModal.pos).toEqual(oldPos);
    });

    it("can prevent resize event", () => {
        windowModal.element.dispatchEvent
            .mockReturnValue(false);
        const oldSize = windowModal.size;
        windowModal.size = { x: 500, y: 600 };
        expect(windowModal.size).toEqual(oldSize);
    });

});
