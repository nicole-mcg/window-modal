import { IPoint } from "@src/interfaces";
import { WindowModal } from "./index";

export interface IWindowModalOptions extends Partial<IWindowBarOptions> {
    window?: undefined; // Replace window from IWindowBarOptions
    title: string;
    elementSelector?: string;
    pos?: IPoint;
    size?: IPoint;
}

export interface IWindowBarOptions {
    title: string;
    window: WindowModal;
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
