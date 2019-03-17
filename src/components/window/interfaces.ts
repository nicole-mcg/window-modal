import { IPoint } from "../../interfaces";
import { WindowModal } from "./index";

export interface IWindowModalOptions extends Partial<IWindowBarOptions> {
    window?: never; // Replace window from IWindowBarOptions
    title?: string;
    elementSelector?: string;
    pos?: IPoint;
    size?: IPoint;
    resizable?: boolean;
    movable?: boolean;
}

export interface IWindowBarOptions {
    window: WindowModal;
    title?: string;
    icon?: IWindowIcon;
    hideClose?: boolean;
    hideMinimize?: boolean;
    compact?: boolean;
}

export interface IWindowIcon {
    src?: string;
    innerHTML?: string;
    element?: HTMLElement;
    selector?: string;
}
