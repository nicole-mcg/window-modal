import { WindowModalEvent } from ".";

export class WindowModalUnminimizeEvent extends WindowModalEvent {

    constructor() {
        super("unminimize");
    }

}
