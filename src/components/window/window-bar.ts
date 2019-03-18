import autoBind from "auto-bind";
import { IPoint, IRenderable } from "../../interfaces";
import { Button } from "../button";
import { Div } from "../div";
import { Component } from "../index";
import { WindowIcon } from "./icon";
import { WindowModal } from "./index";
import { IWindowBarOptions, IWindowIcon } from "./interfaces";

export class WindowBar extends Component {
    public get moving() { return Boolean(this._moveStartPos); }
    protected title: Div;
    protected minimizeButton: Button;
    protected closeButton: Button;

    protected icon: WindowIcon;
    protected compact: boolean;
    protected hideClose: boolean;
    protected hideMinimize: boolean;

    protected window: WindowModal;

    private _moveStartPos: IPoint | null;

    constructor(options: IWindowBarOptions) {
        super();
        autoBind(this);
        this.window = options.window;
        this.hideClose = Boolean(options.hideClose);
        this.hideMinimize = Boolean(options.hideMinimize);
        this.compact = Boolean(options.compact);

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

        const titleChildren: IRenderable[] = [title || ""];

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

    public setIcon(icon: IWindowIcon) {
        if (this.icon) {
            this.title.removeChild(this.icon);
        }

        this.icon = new WindowIcon(icon);
        this.title.addChild(this.icon, 0);
    }

    public setCompact(compact: boolean) {
        const { element } = this;
        if (!compact && this.compact) {
            const newClass = element.className.replace("WindowModel-bar--compact", "");
            element.className = newClass;
        }

        if (compact && !this.compact) {
            element.className += "WindowModel-bar--compact";
        }
    }

    public setHideClose(hideClose: boolean) {
        const display = hideClose ? "none" : "default";
        this.closeButton.setStyle({ display });
    }

    public setHideMinimize(hideMinimize: boolean) {
        const display = hideMinimize ? "none" : "default";
        this.minimizeButton.setStyle({ display });
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
        const buttons = [];

        const createButton = (text: string, id: string, onClick?: () => void): Button => {
            const button = new Button([text], id);
            if (onClick) {
                button.element.onclick = onClick;
            }
            return button;
        };

        this.minimizeButton = createButton("_", "minimize", this.window.minimize);
        buttons.push(this.minimizeButton);
        this.setHideMinimize(this.hideMinimize);

        this.closeButton = createButton("✖", "close", this.window.destroy);
        buttons.push(this.closeButton);
        this.setHideClose(this.hideClose);

        return buttons;
    }

}
