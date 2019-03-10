import { Component } from "@component";
import { WindowModal } from "@components/window";
import { IPoint, IRenderable } from "@src/interfaces";
import autoBind from "auto-bind";
import { Button } from "../button";
import { Div } from "../div";
import { WindowIcon } from "./icon";
import { IWindowBarOptions } from "./interfaces";

export class WindowBar extends Component {
    public get moving() { return Boolean(this._moveStartPos); }
    protected icon: WindowIcon;
    protected title: Div;
    protected minimizeButton: Button;
    protected closeButton: Button;

    protected options: IWindowBarOptions;

    protected window: WindowModal;

    private _moveStartPos: IPoint | null;

    constructor(options: IWindowBarOptions) {
        super();
        autoBind(this);
        this.options = options;
        this.window = options.window;

        this.element = null as any;
        this.icon = null as any;
        this.title = null as any;
        this.minimizeButton = null as any;
        this.closeButton = null as any;

        this._moveStartPos = null;

        this.init(options);
    }

    public init(options: IWindowBarOptions) {
        const {
            title,
            compact,
        } = options;

        if (options.icon) {
            this.icon = new WindowIcon(options.icon);
        }

        const titleChildren: IRenderable[] = [title];

        if (this.icon) {
            titleChildren.unshift(this.icon);
        }

        const classname = compact ? "WindowModal-bar--compact" : "";
        this.title = new Div(titleChildren).withClassname("WindowModal-title");
        const ele = new Div([
            this.title,
            new Div().withClassname("WindowModal-bar-spacer"),
            new Div(this.createButtons()).withClassname("WindowModal-buttons"),
        ]).withClassname(`WindowModal-bar ${classname}`);

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

        if (!moving || !_moveStartPos || !this.window.movable) {
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

    public setTitle(title: string) {
        this.title.element.textContent = title;
    }

    public minimize() {
        this.setStyle({ cursor: "default" });
        this.minimizeButton.element.textContent = "□";
    }

    public unminimize() {
        this.setStyle({ cursor: "pointer" });
        this.minimizeButton.element.textContent = "_";
    }

    private onMouseDown(event: any) {
        if (!event || event.button !== 0 || !this.window.movable || this.window.minimized) {
            return;
        }

        const { pos } = this.window;

        this._moveStartPos = {
            x: event.pageX - pos.x,
            y: event.pageY - pos.y,
        };
    }

    private createButtons() {
        const { options } = this;
        const { hideMinimize, hideClose } = options;
        const buttons = [];

        const createButton = (text: string, id: string, onClick?: () => void): Button => {
            const button = new Button([text], id);
            if (onClick) {
                button.element.onclick = onClick;
            }
            return button;
        };

        if (!hideMinimize) {
            this.minimizeButton = createButton("_", "minimize", this.window.minimize);
            buttons.push(this.minimizeButton);
        }

        if (!hideClose) {
            this.closeButton = createButton("✖", "close", this.window.destroy);
            buttons.push(this.closeButton);
        }

        return buttons;
    }

}
