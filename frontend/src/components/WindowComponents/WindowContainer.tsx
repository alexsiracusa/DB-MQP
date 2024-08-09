import '../../styles/TabContainer.css'
import '../../styles/Gutters.css'

import {useStateCallback, updateState} from "../../useStateCallback.tsx";
import Window from "./Windows/Window.tsx";
import WindowGroup from "./Windows/WindowGroup/WindowGroup.tsx";
import TabWindow from "./Windows/TabWindow/TabWindow.tsx";

import WindowGroupComponent from "./Windows/WindowGroup/WindowGroupComponent.tsx"
import TabWindowComponent from "./Windows/TabWindow/TabWindowComponent.tsx";

export type Direction = "horizontal" | "vertical";
export type Position = "before" | "after";


type TabMockupProps = {
    self: Window;
}

const WindowContainer = (props: TabMockupProps) => {
    const [, setState] = useStateCallback({});
    const self = props.self;
    self.forceUpdate = updateState(setState);

    if (self instanceof TabWindow) {
        if (self.parent == null) {
            console.log("bruh 2")
            return;
        }

        return <TabWindowComponent self={self}/>;
    } else if (self instanceof WindowGroup) {
        return <WindowGroupComponent self={self}/>;
    } else {
        console.log("failed to render")
    }
};

export default WindowContainer;