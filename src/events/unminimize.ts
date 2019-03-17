import { WindowModalEvent } from ".";
import { WindowModal } from "../components/window";

export class WindowModalUnminimizeEvent extends WindowModalEvent {

    constructor(windowModal: WindowModal) {
        super("unminimize", windowModal);
    }

}
