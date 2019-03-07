import autoBind from "auto-bind";

import { Component } from "@src/component";
import { IPoint } from "@src/interfaces";
import { Button } from "./button";
import { Div } from "./div";

const RESIZE_DIST = 10;
const MIN_SIZE = 200;

export class FloatingWindow extends Component {
    protected element: HTMLElement;
    protected title: Div;
    protected windowBar: Div;
    protected content: Div;
    protected minimizeButton: Button;
    protected closeButton: Button;

    private pos: IPoint;
    private size: IPoint;
    private lastResize: IPoint | null;
    private moveStart: IPoint | null;
    private wasResizeCursor: boolean;
    private focused: boolean;

    constructor(title: string, elementSelector?: string) {
        super();
        autoBind(this);

        this.element = (elementSelector && document.querySelector(elementSelector)) || document.createElement("div");
        this.element.className = "FloatingWindow";
        this.pos = { x: 0, y: 0 };
        this.size = { x: MIN_SIZE, y: MIN_SIZE };
        this.lastResize = null;
        this.moveStart = null;
        this.wasResizeCursor = false;
        this.focused = false;

        const { element } = this;
        this.updateSize();
        this.updatePos();

        this.windowBar = null as any;
        this.title = null as any;
        this.content = null as any;
        this.minimizeButton = null as any;
        this.closeButton = null as any;

        this.init(title);

        const windowBarEle = this.windowBar.getElement() as any;

        windowBarEle.addEventListener("mousedown", this.onMouseDownBar);
        window.addEventListener("mousedown", this.onMouseDownWindow);
        window.addEventListener("mouseup", this.onMouseUp);
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("mouseenter", this.onMouseEnter);
        window.addEventListener("select", this.onSelectStart);
    }

    public destroy() {
        const windowBarEle = this.windowBar.getElement() as any;
        windowBarEle.removeEventListener("mousedown", this.onMouseDownBar);
        window.removeEventListener("mousedown", this.onMouseDownWindow);
        window.removeEventListener("mouseup", this.onMouseUp);
        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("mouseenter", this.onMouseEnter);
        window.removeEventListener("select", this.onSelectStart);
    }

    private init(title: string) {
        const windowBar = new Div("FloatingWindow-bar");
        const windowButtons = new Div("FloatingWindow-buttons");
        this.minimizeButton = this.createButton("_", "minimize", windowButtons);
        this.closeButton = this.createButton("✖", "close", windowButtons);

        const content = new Div("FloatingWindow-content");

        const titleComp = new Div("FloatingWindow-title");
        const titleElem = titleComp.getElement() as any;
        titleElem.textContent = title;

        windowBar.addChild(titleComp);
        windowBar.addChild(new Div("FloatingWindow-bar-spacer"));
        windowBar.addChild(windowButtons);

        this.addChild(windowBar);
        this.windowBar = windowBar;

        this.addChild(content);
        this.content = content;
        (content.getElement() as any).textContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dignissim convallis aenean et tortor at risus viverra adipiscing. Consectetur adipiscing elit ut aliquam purus sit amet. Cras semper auctor neque vitae. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula. Ipsum dolor sit amet consectetur adipiscing elit. Sed arcu non odio euismod. Eu turpis egestas pretium aenean pharetra magna ac. Duis ut diam quam nulla porttitor massa id. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in.
            Ornare massa eget egestas purus viverra accumsan in nisl. Sollicitudin ac orci phasellus egestas tellus rutrum tellus. Sit amet risus nullam eget. Fames ac turpis egestas integer eget aliquet nibh praesent. Diam vulputate ut pharetra sit amet aliquam id. Mi ipsum faucibus vitae aliquet. Sodales ut etiam sit amet nisl purus in mollis. Diam vel quam elementum pulvinar etiam non quam lacus suspendisse. Egestas maecenas pharetra convallis posuere morbi. Aliquam eleifend mi in nulla posuere sollicitudin aliquam. Velit egestas dui id ornare arcu. Quis lectus nulla at volutpat diam.
            Dolor sit amet consectetur adipiscing elit pellentesque habitant. In massa tempor nec feugiat nisl pretium fusce id velit. Bibendum ut tristique et egestas quis ipsum suspendisse. Sed id semper risus in hendrerit gravida rutrum. Justo nec ultrices dui sapien eget mi. At volutpat diam ut venenatis tellus in. Vulputate sapien nec sagittis aliquam malesuada. Arcu felis bibendum ut tristique et egestas. Vitae et leo duis ut diam quam nulla porttitor massa. Egestas quis ipsum suspendisse ultrices gravida dictum. Adipiscing tristique risus nec feugiat.
            Sit amet consectetur adipiscing elit ut aliquam purus. Turpis egestas integer eget aliquet nibh praesent tristique magna. In dictum non consectetur a erat nam at lectus. Molestie at elementum eu facilisis sed odio morbi quis commodo. Elementum facilisis leo vel fringilla est ullamcorper. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Vitae nunc sed velit dignissim sodales ut eu sem. Amet nulla facilisi morbi tempus iaculis urna id. Nunc non blandit massa enim. Faucibus turpis in eu mi. At volutpat diam ut venenatis. A pellentesque sit amet porttitor eget dolor morbi non arcu. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Augue lacus viverra vitae congue eu consequat ac. Feugiat nibh sed pulvinar proin. Sed lectus vestibulum mattis ullamcorper. In nulla posuere sollicitudin aliquam ultrices sagittis orci. Sed ullamcorper morbi tincidunt ornare massa eget. Dolor sit amet consectetur adipiscing elit.
            Sed arcu non odio euismod lacinia. A cras semper auctor neque vitae tempus. Leo integer malesuada nunc vel risus commodo viverra maecenas. Suspendisse ultrices gravida dictum fusce ut placerat orci. Maecenas accumsan lacus vel facilisis volutpat. Ultricies lacus sed turpis tincidunt id aliquet risus. Suspendisse ultrices gravida dictum fusce ut placerat orci. Urna et pharetra pharetra massa massa ultricies mi quis. Diam maecenas ultricies mi eget mauris pharetra et ultrices neque. Viverra tellus in hac habitasse platea dictumst. Cras tincidunt lobortis feugiat vivamus at augue eget. Nisl rhoncus mattis rhoncus urna neque viverra. Feugiat in fermentum posuere urna nec tincidunt praesent. Tellus cras adipiscing enim eu turpis egestas pretium aenean.`;
    }

    private onMouseEnter(event: any) {
        if (event.buttons === 0) {
            this.clearMouseState();
        }
    }

    private getDistanceToResize(mousePos: IPoint) {
        const { pos, size } = this;
        const resizePoint = {
            x: pos.x + size.x,
            y: pos.y + size.y,
        };

        // console.log(mousePos, resizePoint)
        return Math.sqrt((mousePos.x - resizePoint.x) ** 2 + (mousePos.y - resizePoint.y) ** 2);
    }

    private onMouseMove(event: any) {
        const { element, pos, moveStart, lastResize, size } = this;

        // console.log(event);
        const mousePos = {
            x: event.pageX,
            y: event.pageY,
        };

        if (this.getDistanceToResize(mousePos) < RESIZE_DIST) {
            document.body.style.cursor = "nw-resize";
            this.wasResizeCursor = true;
        } else if (this.wasResizeCursor) {
            document.body.style.cursor = "default";
            this.wasResizeCursor = false;
        }

        if (lastResize) {
            this.size = {
                x: Math.max(size.x + mousePos.x - lastResize.x, MIN_SIZE),
                y: Math.max(size.y + mousePos.y - lastResize.y, MIN_SIZE),
            };
            this.lastResize = mousePos;
            this.updateSize();
            event.preventDefault();
            return;
        }

        if (!moveStart) {
            return;
        }

        const newPos = {
            x: mousePos.x - moveStart.x,
            y: mousePos.y - moveStart.y,
        };

        console.log(mousePos, moveStart, newPos);

        this.pos = newPos;
        this.updatePos();

        event.preventDefault();
    }

    private onMouseDownBar(event: any) {
        if (!event) {
            return;
        }

        const { pos } = this;

        this.moveStart = {
            x: event.pageX - pos.x,
            y: event.pageY - pos.y,
        };
        this.element.style.userSelect = "none";
    }

    private onMouseDownWindow(event: any) {
        if (!event) {
            return;
        }

        const mousePos = {
            x: event.pageX,
            y: event.pageY,
        };

        const { element, focused } = this;

        if (this.getDistanceToResize(mousePos) < RESIZE_DIST) {
            this.focused = true;
            this.lastResize = mousePos;
            event.preventDefault();
            this.updateFocused();
            return;
        }

        if (element.contains(event.target)) {
            if (!focused) {
                this.focused = true;
                this.updateFocused();
            }
        } else {
            if (focused) {
                this.focused = false;
                this.updateFocused();
            }
        }
    }

    private clearMouseState() {
        console.log("cleared mouose state");
        this.moveStart = null;
        this.lastResize = null;
        this.element.style.userSelect = "default";
    }

    private onMouseUp() {
        this.clearMouseState();
    }

    private updateSize() {
        const { element } = this;
        element.style.width = `${this.size.x}px`;
        element.style.height = `${this.size.y}px`;
    }

    private updatePos() {
        const { element } = this;
        element.style.top = `${this.pos.y}px`;
        element.style.left = `${this.pos.x}px`;
    }

    private updateFocused() {
        const { element } = this;
        element.style.zIndex = this.focused ? "1" : "0";
    }

    private onSelectStart(event: any) {
        if (this.moveStart || this.lastResize) {
            event.preventDefault();
        }
    }

    private createButton(text: string, id?: string, parent: Component= this): Button {
        const button = new Button(text, id);
        parent.addChild(button);
        return button;
    }

    // private create

}
