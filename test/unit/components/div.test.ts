import { Div } from "@src/components/div";

const oldCreateElement = document.createElement;

describe("Div", () => {

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
        const className = "test";
        const div = new Div([], className);
        expect(div).toBeTruthy();

        expect(document.createElement).toHaveBeenCalledWith("div");
        expect(div).toHaveProperty("element", { className });
    });

});
