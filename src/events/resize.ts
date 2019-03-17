import { WindowModalEvent } from ".";
import { WindowModal } from "../components/window";
import { IPoint } from "../interfaces";

export class WindowModalResizeEvent extends WindowModalEvent {

    private _oldSize: IPoint;
    public get oldsize() { return this._oldSize; }

    private _newSize: IPoint;
    public get newSize() { return this._newSize; }

    constructor(windowModal: WindowModal, oldSize: IPoint, newSize: IPoint) {
        super("resize", windowModal);
        this._oldSize = oldSize;
        this._newSize = newSize;
    }

}
