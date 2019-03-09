import { WindowModal } from "./index";

export interface IWindowModalOptions {
    title: string;
    elementSelector?: string;
}

export interface IWindowBarOptions {
    title: string;
    window: WindowModal;
    hideClose?: boolean;
    hideMinimize?: boolean;
}
