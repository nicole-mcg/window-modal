import { IPoint } from "@src/interfaces";
import { WindowModalEvent } from ".";

export class WindowModalResizeEvent extends WindowModalEvent {

    private _oldSize: IPoint;
    public get oldsize() { return this._oldSize; }

    private _newSize: IPoint;
    public get newSize() { return this._newSize; }

    constructor(oldSize: IPoint, newSize: IPoint) {
        super("resize");
        this._oldSize = oldSize;
        this._newSize = newSize;
    }

}
