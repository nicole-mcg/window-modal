import { Component } from "@component";
import { WindowModal } from "@components/window";
import { IPoint } from "@src/interfaces";
import autoBind from "auto-bind";
import { Button } from "../button";
import { Div } from "../div";
import { IWindowBarOptions } from "./interfaces";

export class WindowBar extends Component {
    protected minimizeButton: Button;
    protected closeButton: Button;

    protected options: IWindowBarOptions;

    protected window: WindowModal;

    private _moveStartPos: IPoint | null;
    public get moving() { return Boolean(this._moveStartPos); }

    constructor(options: IWindowBarOptions) {
        super();
        autoBind(this);
        this.options = options;
        this.window = options.window;

        this.element = null as any;
        this.minimizeButton = null as any;
        this.closeButton = null as any;

        this._moveStartPos = null;

        this.init(options);
    }

    public init({ title }: IWindowBarOptions) {
        const setElement = (element: Component | string, propName: string) => {
            (this as any)[propName] = element;
            return element as Component;
        };
        const ele = new Div([
            new Div([title]).classname("WindowModaltitle") as Div,
            new Div().classname("WindowModalbar-spacer") as Div,
            new Div([
                setElement(
                    this.createButton("_", "minimize", this.minimize),
                    "minimizeButton",
                ),
                setElement(
                    this.createButton("✖", "close", this.window.destroy),
                    "closeButton",
                ),
            ]).classname("WindowModalbuttons"),
        ]).classname("WindowModalbar") as Component;

        this.element = ele.element;
        this.element.addEventListener("mousedown", this.onMouseDown);
    }

    public destroy() {
        this.element.removeEventListener("mousedown", this.onMouseDown);
    }

    // Window will call this
    public clearMouseState() {
        this._moveStartPos = null;
    }

    public onMouseMove(event: any) {
        const { moving, window, _moveStartPos } = this;

        if (!moving || !_moveStartPos) {
            return;
        }

        const mousePos = {
            x: event.pageX,
            y: event.pageY,
        };

        const newPos = {
            x: mousePos.x - _moveStartPos.x,
            y: mousePos.y - _moveStartPos.y,
        };

        window.pos = newPos;

        event.preventDefault();
    }

    private onMouseDown(event: any) {
        if (!event) {
            return;
        }

        const { pos } = this.window;

        this._moveStartPos = {
            x: event.pageX - pos.x,
            y: event.pageY - pos.y,
        };
    }

    private minimize() {
        if (this.window.minimized) {
            this.maximize();
            return;
        }
        this.setStyle({ cursor: "default" });
        this.minimizeButton.element.textContent = "□";
        this.window.minimize();
    }

    private maximize() {
        this.setStyle({ cursor: "pointer" });
        this.minimizeButton.element.textContent = "_";
        this.window.maximize();
    }

    private createButton(text: string, id: string, onClick?: () => void): Button {
        const button = new Button([text], id);
        if (onClick) {
            button.element.onclick = onClick;
        }
        return button;
    }

}
