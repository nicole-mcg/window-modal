import { WindowResizeHandler } from "@src/components/window/resize-handler";
import { createEventStub, createWindowStub } from "./test-util";

describe("WindowResizeHandler", () => {
    let windowElement: HTMLElement;
    let windowStub: any;

    let resizeHandler: any;

    beforeEach(() => {
        windowElement = document.createElement("div");
        windowStub = createWindowStub(windowElement);
        resizeHandler = new WindowResizeHandler(windowStub);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        window.addEventListener = jest.fn();
        window.removeEventListener = jest.fn();
    });

    it("can be created", () => {
        expect(window.addEventListener).toHaveBeenCalledWith("mousedown", resizeHandler.onMouseDown);
    });

    it("can be destroyed", () => {
        resizeHandler.destroy();
        expect(window.removeEventListener).toHaveBeenCalledWith("mousedown", resizeHandler.onMouseDown);
    });

    it("can start resizing", () => {
        const { pos, size } = windowStub;
        windowStub.mousePos.x = pos.x + size.x;
        windowStub.mousePos.y = pos.y + size.y;
        const event = createEventStub(windowElement);

        resizeHandler.onMouseDown(event);

        expect(resizeHandler.resizing).toBe(true);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(windowStub.focused).toBe(true);
        expect(resizeHandler.lastResizePos).toEqual(windowStub.mousePos);
        expect(windowStub.updateElement).toHaveBeenCalled();
    });

    it("can resize", () => {
        const moveDistX = 2;
        const moveDistY = 5;
        const { pos, size, mousePos } = windowStub;
        windowStub.resizing = true;
        mousePos.x = pos.x + size.x + moveDistX;
        mousePos.y = pos.y + size.y + moveDistY;
        resizeHandler.lastResizePos = {
            x: pos.x + size.x,
            y: pos.y + size.y,
         };
        const event = createEventStub(windowElement);

        resizeHandler.onMouseMove(event);

        expect(windowStub.setStyle).toHaveBeenCalledWith({ cursor: "nw-resize" });
        expect(document.body.style.cursor).toBe("nw-resize");
        expect(windowStub.size).toEqual({
            x: size.x + moveDistX,
            y: size.y + moveDistY,
        });
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it("can't be resized when window 'resizable' is false", () => {
        const { pos, size } = windowStub;
        const originalSize = { ...size };
        windowStub.resizable = false;
        windowStub.mousePos.x = pos.x + size.x;
        windowStub.mousePos.y = pos.y + size.y;
        let event = createEventStub(windowElement);

        resizeHandler.onMouseDown(event);
        expect(resizeHandler.resizing).toBe(false);

        windowStub.resizable = true;
        resizeHandler.onMouseDown(event);
        expect(resizeHandler.resizing).toBe(true);

        windowStub.resizable = false;
        windowStub.mousePos.x = pos.x + size.x + 2;
        windowStub.mousePos.y = pos.y + size.y + 2;
        event = createEventStub(windowElement);
        resizeHandler.onMouseMove(event);
        expect(windowStub.size).toEqual(originalSize);
    });

    it("can stop resizing", () => {
        resizeHandler.lastResizePos = { x: 0, y: 0 };
        expect(resizeHandler.resizing).toBe(true);
        resizeHandler.clearMouseState();
        expect(resizeHandler.resizing).toBe(false);
    });

    it("wont resize small than min size", () => {
        const moveDistX = -2;
        const moveDistY = -5;
        const { pos, size, mousePos } = windowStub;
        const originalSize = { ...size };
        windowStub.resizing = true;
        mousePos.x = pos.x + size.x + moveDistX;
        mousePos.y = pos.y + size.y + moveDistY;
        resizeHandler.lastResizePos = {
            x: pos.x + size.x,
            y: pos.y + size.y,
         };
        const event = createEventStub(windowElement);

        resizeHandler.onMouseMove(event);

        expect(document.body.style.cursor).toBe("nw-resize");
        expect(windowStub.size).toEqual(originalSize);

        // Test that starts resizing when mouse reaches bounds
        mousePos.x = pos.x + originalSize.x;
        mousePos.y = pos.y + originalSize.y;
        resizeHandler.onMouseMove(event);
        expect(windowStub.size).toEqual(originalSize);
    });

});
