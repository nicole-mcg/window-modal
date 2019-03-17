import { WindowModalEvent } from ".";
import { WindowModal } from "../components/window";

export class WindowModalMinimizeEvent extends WindowModalEvent {

    constructor(windowModal: WindowModal) {
        super("minimize", windowModal);
    }

}
