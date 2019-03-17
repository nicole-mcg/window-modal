import { WindowModalEvent } from ".";
import { WindowModal } from "../components/window";

export class WindowModalFocusEvent extends WindowModalEvent {

    constructor(windowModal: WindowModal) {
        super("focus", windowModal);
    }

}
