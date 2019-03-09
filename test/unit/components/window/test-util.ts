import { MIN_WINDOW_SIZE } from "@src/components/window/resize-handler";

export function createWindowStub(element?: HTMLElement): any {
    return {
        element,
        minimized: false,
        resizing: false,
        focused: false,
        pos: { x: 100, y: 100 },
        size: { x: MIN_WINDOW_SIZE, y: MIN_WINDOW_SIZE },
        mousePos: { x: 0, y: 0 },
        updateElement: jest.fn(),
        setStyle: jest.fn().mockImplementation((style: any) => {
            element && Object.keys(style).forEach((prop: any) => element.style[prop] = style[prop] as any);
        }),
        destroy: jest.fn(),
        minimize: jest.fn(),
        maximize: jest.fn(),
    };
}

export function createMouseEventStub(target: any) {
    return {
        target,
        preventDefault: jest.fn(),
    };
}
