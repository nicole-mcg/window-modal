import "./index.less";

import { WindowModal } from "./components/window";
export default WindowModal;

export { IPoint, IRenderable } from "./interfaces";
export {
    IWindowIcon,
    IWindowModalOptions,
} from "./components/window/interfaces";

export { WindowModalBlurEvent } from "./events/blur";
export { WindowModalFocusEvent } from "./events/focus";
export { WindowModalMinimizeEvent } from "./events/minimize";
export { WindowModalUnminimizeEvent } from "./events/unminimize";
export { WindowModalResizeEvent } from "./events/resize";
export { WindowModalMoveEvent } from "./events/move";
