import { FloatingWindow, textContent } from "@components/window";
import { Button } from "@src/components/button";
import { Div } from "@src/components/div";

const oldQuerySelector = document.querySelector;

const mockComponents: any[] = [];

describe("FloatingWindow", () => {
    afterEach(() => {
        jest.clearAllMocks();
        mockComponents.length = 0;
    });

    beforeAll(() => {
        document.querySelector = jest.fn();
    });

    afterAll(() => {
        document.querySelector = oldQuerySelector;
    });

    it("can be created with a selector", () => {
        const title = "test title";
        const window: any = new FloatingWindow(title);
        expect(window).toBeTruthy();

        expect(window.children).toEqual([
            new Div([
                new Div([title]).classname("FloatingWindow-title") as Div,
                new Div().classname("FloatingWindow-bar-spacer") as Div,
                new Div([
                    new Button(["_"], "minimize"),
                    new Button(["✖"], "close"),
                ]).classname("FloatingWindow-buttons"),
            ]).classname("FloatingWindow-bar"),
            new Div([textContent]).classname("FloatingWindow-content"),
        ]);

    });

    it("can be created without a selector", () => {
        const element = document.createElement("div");
        (document.querySelector as any).mockReturnValue(element);

        const title = "test title";
        const window: any = new FloatingWindow(title, "#mydiv");
        expect(window).toBeTruthy();
        expect(window.element).toBe(element);

        expect(window.children).toEqual([
            new Div([
                new Div([title]).classname("FloatingWindow-title") as Div,
                new Div().classname("FloatingWindow-bar-spacer") as Div,
                new Div([
                    new Button(["_"], "minimize"),
                    new Button(["✖"], "close"),
                ]).classname("FloatingWindow-buttons"),
            ]).classname("FloatingWindow-bar"),
            new Div([textContent]).classname("FloatingWindow-content"),
        ]);

    });
});
