import { WindowModalEvent } from ".";
import { WindowModal } from "../components/window";

export class WindowModalBlurEvent extends WindowModalEvent {

    constructor(windowModal: WindowModal) {
        super("blur", windowModal);
    }

}
