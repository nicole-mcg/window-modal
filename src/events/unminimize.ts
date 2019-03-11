import { WindowModal } from "@src/components/window";
import { WindowModalEvent } from ".";

export class WindowModalUnminimizeEvent extends WindowModalEvent {

    constructor(windowModal: WindowModal) {
        super("unminimize", windowModal);
    }

}
