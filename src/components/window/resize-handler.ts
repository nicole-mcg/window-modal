import { IPoint } from "@src/interfaces";
import autoBind from "auto-bind";
import { WindowModal } from "./index";

const RESIZE_DIST = 10;
export const MIN_WINDOW_SIZE = 200;

export class WindowResizeHandler {
    public get resizing() { return Boolean((this.lastResizePos)); }
    public lastResizePos: IPoint | null = null;
    protected wasResizeCursor: boolean; // use to only cancel when needed (for multiple windows)
    protected window: WindowModal;

    constructor(windowModal: WindowModal) {
        autoBind(this);
        this.window = windowModal;
        this.wasResizeCursor = false;
        window.addEventListener("mousedown", this.onMouseDown);
    }

    public destroy() {
        window.removeEventListener("mousedown", this.onMouseDown);
    }

    clearMouseState() {
        this.lastResizePos = null;
    }

    onMouseDown(event: any) {
        if (!event) {
            return;
        }
        const { window } = this;
        const { element, focused } = window;

        if (this.getDistanceToResize() <= RESIZE_DIST) {
            event.preventDefault();
            this.startResize();
            return;
        }

        const clickedWindow = element.contains(event.target);
        if (clickedWindow && !focused) {
            window.focused = true;
        } else if (!clickedWindow && focused) {
            window.focused = false;
        }
    }

    onMouseMove(event: any) {
        const { minimized, resizing } = this.window;
        if (minimized) {
            return;
        }
        const { window, wasResizeCursor: wasResizing } = this;

        if (this.getDistanceToResize() < RESIZE_DIST) {
            window.setStyle({ cursor: "nw-resize" });
            document.body.style.cursor = "nw-resize";
            this.wasResizeCursor = true;
        } else if (!resizing && wasResizing) {
            const { body } = document;
            const element = window.element;
            if (element.style.cursor !== "default" || body.style.cursor !== "default") {
                window.setStyle({ cursor: "default" });
                body.style.cursor = "default";
            }
            this.wasResizeCursor = false;
        }

        if (resizing) {
            this.continueResizing();
            event.preventDefault();
            return;
        }

    }

    private getDistanceToResize() {
        const { pos, size, mousePos } = this.window;
        const x = pos.x + size.x;
        const y = pos.y + size.y;
        return Math.sqrt((mousePos.x - x) ** 2 + (mousePos.y - y) ** 2);
    }

    private startResize() {
        const { window } = this;
        window.focused = true;
        this.lastResizePos = { ...window.mousePos };
        this.wasResizeCursor = true;
        window.updateElement();
    }

    private continueResizing() {
        const { window, lastResizePos } = this;
        const { size, mousePos } = window;

        if (!lastResizePos) {
            return;
        }

        const lastPos = { ...mousePos };
        const newSize = {
            x: size.x + mousePos.x - lastResizePos.x,
            y: size.y + mousePos.y - lastResizePos.y,
        };

        if (newSize.x < MIN_WINDOW_SIZE) {
            newSize.x = MIN_WINDOW_SIZE;
            lastPos.x = lastResizePos.x;
        }

        if (newSize.y < MIN_WINDOW_SIZE) {
            newSize.y = MIN_WINDOW_SIZE;
            lastPos.y = lastResizePos.y;
        }

        this.lastResizePos = lastPos;
        window.size = newSize;
        window.updateElement();
        return;
    }

}
