import { FloatingWindow } from "@components/window";
import * as btn from "@src/components/button";
import * as div from "@src/components/div";

const oldCreateElement = document.createElement;
const oldQuerySelector = document.querySelector;

const oldButton = btn.Button;
const oldDiv = div.Div;

const mockComponents: any[] = [];

describe("FloatingWindow", () => {
    const mockElement = { appendChild: jest.fn() };

    afterEach(() => {
        jest.clearAllMocks();
        mockComponents.length = 0;
    });

    beforeAll(() => {
        document.createElement = jest.fn().mockReturnValue(mockElement);
        document.querySelector = jest.fn();

        (btn.Button as any) = jest.fn().mockImplementation(() => createMockComponent());
        (div.Div as any) = jest.fn().mockImplementation(() => createMockComponent());
    });

    afterAll(() => {
        document.createElement = oldCreateElement;
        document.querySelector = oldQuerySelector;

        (btn.Button as any) = oldButton;
        (div.Div as any) = oldDiv;
    });

    it("can be created without params", () => {
        const window = new FloatingWindow();
        expect(window).toBeTruthy();
        expect(document.createElement).toHaveBeenCalledWith("div");

        expect(mockComponents).toHaveLength(3);

        expect(mockElement).toHaveProperty("className", "FloatingWindow");
        expect(div.Div).toHaveBeenCalledWith("FloatingWindow-bar");

        expect(btn.Button).toHaveBeenCalledWith("_");
        expect(mockComponents);

        expect(btn.Button).toHaveBeenCalledWith("X");

        const mockDiv = mockComponents[0];
        expect(mockDiv).toBeTruthy();

        const mockMinimizeBtn = mockComponents[1];
        expect(mockMinimizeBtn).toBeTruthy();
        expect(mockDiv.addChild).toHaveBeenCalledWith(mockMinimizeBtn);

        const mockCloseBtn = mockComponents[2];
        expect(mockCloseBtn).toBeTruthy();
        expect(mockDiv.addChild).toHaveBeenCalledWith(mockMinimizeBtn);
    });

    it("can be created with params", () => {
        const selector = "#test";
        const element = { appendChild: jest.fn() };
        (document.querySelector as any).mockReturnValue(element);

        const window = new FloatingWindow(selector);
        expect(window).toBeTruthy();
        expect(document.querySelector).toHaveBeenCalledWith(selector);
        expect(window).toHaveProperty("element", element);

        expect(mockComponents).toHaveLength(3);

        expect(mockElement).toHaveProperty("className", "FloatingWindow");
        expect(div.Div).toHaveBeenCalledWith("FloatingWindow-bar");

        expect(btn.Button).toHaveBeenCalledWith("_");
        expect(mockComponents);

        expect(btn.Button).toHaveBeenCalledWith("X");

        const mockDiv = mockComponents[0];
        expect(mockDiv).toBeTruthy();

        const mockMinimizeBtn = mockComponents[1];
        expect(mockMinimizeBtn).toBeTruthy();
        expect(mockDiv.addChild).toHaveBeenCalledWith(mockMinimizeBtn);

        const mockCloseBtn = mockComponents[2];
        expect(mockCloseBtn).toBeTruthy();
        expect(mockDiv.addChild).toHaveBeenCalledWith(mockMinimizeBtn);
    });
});

const divElement = { appendChild: jest.fn() };
function createMockComponent() {
    const component = {
        addChild: jest.fn(),
        getElement: jest.fn().mockReturnValue(divElement),
    };
    mockComponents.push(component);
    return component;
}
