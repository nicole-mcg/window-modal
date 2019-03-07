import { Button } from "@src/components/button";

describe("Button", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("can be created", () => {
        const content = document.createElement("div");
        const button = new Button([content]);
        expect(button).toBeTruthy();

        const element = document.createElement("button");
        element.className = "FloatingWindow-button";
        element.appendChild(content.cloneNode());
        expect(button).toHaveProperty("element", element);
    });

});
