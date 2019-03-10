# Options

Example:
```javascript
const options = {
  title: "Window Title!",
};
new WindowModal(options);
```

<b><sub>* All options are optional</sub></b>

| Name | Type | Description |
| ------------- | ------------- | ----- |
| title | string | The title for the window |
| elementSelector | string | A selector to an element to use for the window. Contents, props and element type are preserved |
| icon | [IWindowIcon](https://github.com/nik-m2/window-modal/blob/master/docs/IWindowIcon.md) | An icon to use for the window |
| pos | [IPoint](https://github.com/nik-m2/window-modal/blob/master/docs/IPoint.md) | The starting position for the window |
| size | [IPoint](https://github.com/nik-m2/window-modal/blob/master/docs/IPoint.md) | The starting size for the (must be greater than 200!) |
| resizable | boolean | If false, the window cannot be resized by the user |
| movable | boolean | If false, the window cannot be moved by the user |
| compact | boolean | If true, the style for the window's title bar will have less spacing |
| hideClose | boolean | If true, no close button will be added to the window |
| hideMinimize | boolean | If true, no minimize button will be added to the window |
