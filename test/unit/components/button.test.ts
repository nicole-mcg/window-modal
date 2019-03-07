import { Button } from "@components/button";

const oldCreateElement = document.createElement;

describe("Button", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        document.createElement = jest.fn();
    });

    afterAll(() => {
        document.createElement = oldCreateElement;
    });

    it("can be created", () => {
        const button = new Button();
        expect(window).toBeTruthy();

        expect(document.createElement).toHaveBeenCalledWith("button");
    });

});
