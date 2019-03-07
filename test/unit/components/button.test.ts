import { Button } from "@src/components/button";

const oldCreateElement = document.createElement;

describe("Button", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        document.createElement = jest.fn().mockReturnValue({});
    });

    afterAll(() => {
        document.createElement = oldCreateElement;
    });

    it("can be created", () => {
        const text = "hello";
        const button = new Button(text);
        expect(button).toBeTruthy();

        expect(document.createElement).toHaveBeenCalledWith("button");
        expect(button).toHaveProperty("element", {
            className: "FloatingWindow-button",
            textContent: text,
        });
    });

});
