# IWindowIcon

This is an interface which is used to specify an icon for the window ([Window Options](https://github.com/nik-m2/window-modal/blob/master/docs/options.md)) 

It supports multiple ways to specify an icon. If more than one key is specified, keys will be used in this order:
`element`, `selector`, `innerHTML`, `src`

If no key is specified, a blank div used as icon content

<b><sub>* Options with "?" are optional</sub></b>

| Property | Type | Description |
| ------------- | ------------- | ----- |
| src? | string | The src URL for the image to use as an icon |
| innerHTML? | string | The icon will be created with this [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) |
| element? | [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) | An element to use as the icon's contents. Element is remove from parent if needed. |
| selector? | string | A [query selector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) for the element to use as the icons content. Element will be removed from parent if needed. |
