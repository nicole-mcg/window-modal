import { WindowModal } from "@src/components/window";
import { IPoint } from "@src/interfaces";
import { WindowModalEvent } from ".";

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
