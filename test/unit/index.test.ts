import { FloatingWindow } from "../../src";

describe("FloatingWindow", () => {

    it("can be created", () => {
        const window = new FloatingWindow();
        expect(window).toBeTruthy();
    });
});
