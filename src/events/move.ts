import { WindowModalEvent } from ".";
import { WindowModal } from "../components/window";
import { IPoint } from "../interfaces";

export class WindowModalMoveEvent extends WindowModalEvent {

    private _oldPos: IPoint;
    public get oldPos() { return this._oldPos; }

    private _newPos: IPoint;
    public get newPos() { return this._newPos; }

    constructor(windowModal: WindowModal, oldPos: IPoint, newPos: IPoint) {
        super("move", windowModal);
        this._oldPos = oldPos;
        this._newPos = newPos;
    }

}
