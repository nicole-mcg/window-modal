import { FloatingWindow } from "@components/window";

const oldCreateElement = document.createElement;
const oldQuerySelector = document.querySelector;

describe("FloatingWindow", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        document.createElement = jest.fn();
        document.querySelector = jest.fn();
    });

    afterAll(() => {
        document.createElement = oldCreateElement;
        document.querySelector = oldQuerySelector;
    });

    it("can be created without params", () => {
        const window = new FloatingWindow();
        expect(window).toBeTruthy();

        expect(document.createElement).toHaveBeenCalledWith("div");
    });

    it("can be created with params", () => {
        const selector = "#test";
        const element = { test: 1 };
        (document.querySelector as any).mockReturnValue(element);

        const window = new FloatingWindow(selector);

        expect(window).toBeTruthy();
        expect(document.querySelector).toHaveBeenCalledWith(selector);
        expect(window).toHaveProperty("element", element);
    });
});
