import { WindowModalEvent } from ".";
import { WindowModal } from "../components/window";

export class WindowModalCloseEvent extends WindowModalEvent {

    constructor(windowModal: WindowModal) {
        super("close", windowModal);
    }

}
