import autoBind from "auto-bind";

import { Component } from "@component";
import { IPoint } from "@src/interfaces";
import { addPx, Point } from "@src/util";
import { Div } from "../div";
import { IWindowModalOptions } from "./interfaces";
import { MIN_WINDOW_SIZE, WindowResizeHandler } from "./resize-handler";
import { WindowBar } from "./window-bar";

export class WindowModal extends Component {

    public get mousePos() { return this._mousePos; }

    public get size() { return this._size; }
    public set size(size: IPoint) {
        this._size = size;
        this.updateElement();
    }
    public get pos() { return this._pos; }
    public set pos(pos: IPoint) {
        this._pos = pos;
        this.updateElement();
    }

    public get moving() { return this.windowBar.moving; }
    public get resizing() { return Boolean(this.resizeHandler.resizing); }
    public get minimized() { return this._minimized; }
    public get maximized() { return !this._minimized; }
    public get focused() { return this._focused; }
    public set focused(focused: boolean) {
        this._focused = focused;
        this.updateElement();
    }

    protected content: Component | null;
    protected windowBar: WindowBar;
    protected resizeHandler: WindowResizeHandler;

    private _size: IPoint = { x: MIN_WINDOW_SIZE, y: MIN_WINDOW_SIZE };
    private _minimized: boolean = false;
    private _pos: IPoint = Point.zero;
    private _focused: boolean = true;

    private _mousePos: IPoint = Point.zero;

    constructor(options: IWindowModalOptions) {
        super();
        autoBind(this);

        if (options.pos) {
            this._pos = options.pos;
        }

        if (options.size) {
            this._size = options.size;
        }

        const { elementSelector } = options;
        let element: any;
        if (elementSelector) {
            this.content = null as any;
            element = this.hijackElement(elementSelector);
        } else {
            element = document.createElement("div");
            this.content = null;
        }

        this.element = element;
        this.element.className = "WindowModal";
        this.resizeHandler = new WindowResizeHandler(this);

        this.windowBar = new WindowBar({ window: this, ...options });
        this.addChild(this.windowBar);

        this.content = new Div([this.content || ""]).withClassname("WindowModal-content");
        this.addChild(this.content);

        this.updateElement();

        window.addEventListener("mouseup", this.onMouseUp);
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("select", this.onSelectStart);
        window.addEventListener("mouseenter", this.onMouseEnter);
    }

    public getWindowBar() {
        return this.windowBar;
    }

    public destroy() {
        window.removeEventListener("mouseup", this.onMouseUp);
        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("select", this.onSelectStart);
        window.removeEventListener("mouseenter", this.onMouseEnter);

        this.windowBar.destroy();
        document.body.removeChild(this.element);
        delete this.element;
        delete this.children;
    }

    public minimize() {
        this.setStyle({
            transition: "all 0.5s ease",
            width: "200px", height: "25px",
            left: "0px", top: "0px",
        });
        this._minimized = true;
    }

    public maximize(callback?: () => void) {
        this.setStyle({ bottom: null });
        this.updateElement();
        setTimeout(() => {
            this.setStyle({ transition: "all 0.05s ease" });
            this._minimized = false;
            callback && callback();
        }, 600);
    }

    public clearMouseState() {
        this.resizeHandler.clearMouseState();
        this.windowBar.clearMouseState();
    }

    public updateElement() {
        const { pos, size } = this;
        this.setStyle({
            zIndex: this.focused ? "1" : "0",
            left: addPx(pos.x), top: addPx(pos.y),
            width: addPx(size.x), height: addPx(size.y),
        });
    }

    onMouseEnter(event: any) {
        if (event.buttons === 0) {
            this.clearMouseState();
        }
    }

    private onMouseUp() {
        this.clearMouseState();
    }

    private onSelectStart(event: any) {
        if (this.resizing || this.moving) {
            event.preventDefault();
        }
    }

    private onMouseMove(event: any) {
        this._mousePos = { x: event.pageX, y: event.pageY };
        this.resizeHandler.onMouseMove(event);
        this.windowBar.onMouseMove(event);
    }

    private hijackElement(elementSelector: string): HTMLElement {
        const element = document.querySelector(elementSelector) as any;
        if (!element) {
            throw new Error("Could not find element for window. Selector: " + elementSelector);
        }
        const contentEle = document.createElement("div");
        const content = new Div([contentEle]);

        if (element.parent) {
            element.remove();
        }
        document.body.appendChild(element);

        contentEle.innerHTML = element.innerHTML;
        element.innerHTML = "";

        this.content = content;
        return element;
    }

}
