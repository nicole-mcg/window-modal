# `WindowModal`

This is the class used to create a new window modal. The window will be created and added to the document when the contructor is called. The constructor also accepts a number of [options](https://github.com/nik-m2/window-modal/blob/master/docs/options.md).

The `WindowModal` class has a number of properties and functions which you can use to modify and watch the window.

## Properties

| Name | Type | Can be modified? | Description |
| ------------- | ------------- | ------------- | ------------- |
| size | IPoint | <ul><li>- [x] </li></ul>  | The size of the window |
| pos | IPoint | <ul><li>- [x] </li></ul>  | The location of the window `left: pos.x; top: pos.y` |
| focused | boolean | <ul><li>- [x] </li></ul>  | True if the window element has focus |
| moving | boolean | <ul><li>- [ ] </li></ul>  | True if the window is currently being moved |
| resizing | boolean | <ul><li>- [ ] </li></ul>  | True if the window is currently being resized |
| mousePos | IPoint | <ul><li>- [ ] </li></ul>  | The current position of the mouse on screen |

## Functions

| Name | Description |
| ------------- | ------------- |
| minimize | Minimizes the window |
| unminimize | Unminimizes the window |
| clearMouseState | Cancels resizing/moving the window |
| updateElement | Updates the HTML element with the classes properties |
