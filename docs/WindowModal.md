# `WindowModal`

This is the class used to create a new window modal. The window will be created and added to the document when the contructor is called. The constructor also accepts a number of [options](https://github.com/nik-m2/window-modal/blob/master/docs/options.md).

The `WindowModal` class has a number of properties and functions which you can use to modify and watch the window.

## Properties

| Name | Type | Can be set? | Description |
| ------------- | ------------- | ------------- | ------------- |
| title | string | <ul><li>- [x] </li></ul>  | The title for the window |
| size | [IPoint](https://github.com/nik-m2/window-modal/blob/master/docs/IPoint.md) | <ul><li>- [x] </li></ul>  | The size of the window |
| pos | [IPoint](https://github.com/nik-m2/window-modal/blob/master/docs/IPoint.md) | <ul><li>- [x] </li></ul>  | The location of the window `left: pos.x; top: pos.y` |
| hideClose | boolean | <ul><li>- [x] </li></ul>  | If true, the close button is hidden |
| hideMinimize | boolean | <ul><li>- [x] </li></ul>  | If true, the minimize button is hidden |
| focused | boolean | <ul><li>- [x] </li></ul>  | True if the window element has focus |
| resizable | boolean | <ul><li>- [x] </li></ul>  | If false, the window cannot be resized by the user |
| movable | boolean | <ul><li>- [x] </li></ul>  | If false, the window cannot be moved by the user |
| moving | boolean | <ul><li>- [ ] </li></ul>  | True if the window is currently being moved |
| resizing | boolean | <ul><li>- [ ] </li></ul>  | True if the window is currently being resized |
| mousePos | [IPoint](https://github.com/nik-m2/window-modal/blob/master/docs/IPoint.md) | <ul><li>- [ ] </li></ul>  | The current position of the mouse on screen |

## Functions

| Name | Description |
| ------------- | ------------- |
| minimize() | Minimizes the window |
| unminimize(callback?: Function) | Unminimizes the window |
| clearMouseState() | Cancels resizing/moving the window |
| updateElement() | Updates the HTML element with the classes properties (pos, size, etc) |
