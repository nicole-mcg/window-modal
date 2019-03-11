import { WindowModal } from "@src/components/window";
import { WindowModalEvent } from ".";

export class WindowModalBlurEvent extends WindowModalEvent {

    constructor(windowModal: WindowModal) {
        super("blur", windowModal);
    }

}
