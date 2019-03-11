import { WindowModal } from "@src/components/window";
import { WindowModalEvent } from ".";

export class WindowModalFocusEvent extends WindowModalEvent {

    constructor(windowModal: WindowModal) {
        super("focus", windowModal);
    }

}
