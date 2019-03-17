# Events

You can attach event listeners to the `WindowModal` with `addEventListener`. `preventDefault` may be called on events to stop default behaviour (E.g stop window closing)

All events have key `windowModal` which was the windowModal event was called with

You can listen for the following events (as well as any html events)

| Event Type | Description |
| ------------- | ----- |
| close | Called when window is closed |
| minimize | Called when window is minimized |
| unminimize | Called when window is unminimized |
| focus | Called when window gains focus |
| blur | Called when window loses focus |
| resize | Called when window is resized.<br>Has two properties `oldSize` and `newSize` of type [IPoint](https://github.com/nik-m2/window-modal/blob/master/docs/IPoint.md) |
| move | Called when window is moved.<br>Has two properties `oldPos` and `newPos` of type [IPoint](https://github.com/nik-m2/window-modal/blob/master/docs/IPoint.md) |
