
export abstract class WindowModalEvent extends Event {

    constructor(type: string) {
        super("", {
            bubbles: true,
            cancelable: false,
        });
    }

}
