import { Component } from "@component";

export interface IStyle extends Partial<CSSStyleDeclaration> {}

export interface IPoint {
    x: number;
    y: number;
}

export type IRenderable =
    Component | string | HTMLElement |
    Node;
