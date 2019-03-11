import { IPoint } from "@src/interfaces";
import { WindowModalEvent } from ".";

export class WindowModalMoveEvent extends WindowModalEvent {

    private _oldPos: IPoint;
    public get oldPos() { return this._oldPos; }

    private _newPos: IPoint;
    public get newPos() { return this._newPos; }

    constructor(oldPos: IPoint, newPos: IPoint) {
        super("move");
        this._oldPos = oldPos;
        this._newPos = newPos;
    }

}
