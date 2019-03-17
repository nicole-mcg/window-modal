import { WindowModal } from "../components/window";

export abstract class WindowModalEvent extends Event {

    private _windowModal: WindowModal;
    public get windowModal() { return this._windowModal; }

    constructor(type: string, windowModal: WindowModal) {
        super(type, {
            bubbles: true,
            cancelable: false,
        });
        this._windowModal = windowModal;
    }

}
