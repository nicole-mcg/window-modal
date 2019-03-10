# Options

Example:
```javascript
const options = {
  title: "Window Title!",
};
new WindowModal(options);
```

<b><sub>* Options with "?" are optional</sub></b>

| Name | Type | Description |
| ------------- | ------------- | ----- |
| title | string | The title for the window |
| elementSelector? | string | A selector to an element to use for the window. Contents, props and element type are preserved |
| icon? | [IWindowIcon](https://github.com/nik-m2/window-modal/blob/master/docs/IWindowIcon.md) | An icon to use for the window |
| compact? | boolean | If true, the style for the window's title bar will have less spacing |
| hideClose? | boolean | If true, no close button will be added to the window |
| hideMinimize? | boolean | If true, no minimize button will be added to the window |
