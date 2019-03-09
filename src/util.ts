
export function addPx(value: number | string) {
    return `${value}px`;
}

export class Point {
    static get zero() {
        return { x: 0, y: 0 };
    }
}
