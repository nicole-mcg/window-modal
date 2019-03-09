import { Component } from "@component";
import { Button } from "@components/button";
import { Div } from "@src/components/div";
import { WindowModal } from "@src/components/window";

const oldQuerySelector = document.querySelector;

const mockComponents: any[] = [];

xdescribe("WindowModal", () => {
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
        const window: any = new WindowModal({ title });
        expect(window).toBeTruthy();

        expect(window.children).toEqual([
            new Div([
                new Div([title]).classname("WindowModaltitle") as Div,
                new Div().classname("WindowModalbar-spacer") as Div,
                new Div([
                    new Button(["_"], "minimize"),
                    new Button(["✖"], "close"),
                ]).classname("WindowModalbuttons"),
            ]).classname("WindowModalbar"),
            new Div([""]).classname("WindowModalcontent"),
        ]);

    });

    it("can be created without a selector", () => {
        const element = document.createElement("div");
        const innerHTML = document.createElement("input") as any;
        element.appendChild(innerHTML);

        const renderedElement = new Component([element.cloneNode(true)]);
        (document.querySelector as any).mockReturnValue(element);

        const title = "test title";
        const window: any = new WindowModal({ title, elementSelector: "#mydiv" });
        expect(window).toBeTruthy();
        expect(window.element).toBe(element);

        expect(window.children).toEqual([
            new Div([
                new Div([title]).classname("WindowModaltitle") as Div,
                new Div().classname("WindowModalbar-spacer") as Div,
                new Div([
                    new Button(["_"], "minimize"),
                    new Button(["✖"], "close"),
                ]).classname("WindowModalbuttons"),
            ]).classname("WindowModalbar"),
            new Div([renderedElement]).classname("WindowModalcontent"),
        ]);
    });
});
