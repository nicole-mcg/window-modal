import { WindowModal } from "@src/components/window";
import { WindowModalEvent } from ".";

export class WindowModalMinimizeEvent extends WindowModalEvent {

    constructor(windowModal: WindowModal) {
        super("minimize", windowModal);
    }

}
