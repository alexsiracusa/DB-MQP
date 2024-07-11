import '../../styles/TabContainer.css'
import '../../styles/Gutters.css'

import useStateCallback from "../../useStateCallback.tsx";
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
    const [, updateState] = useStateCallback({});
    function forceUpdate(): Promise<void> {
        return new Promise((resolve) => {
            updateState({}, () => {
                resolve()
            })
        })
    }
    const self = props.self

    // console.log(self)
    self.forceUpdate = forceUpdate

    if (self instanceof TabWindow) {
        if (self.parent == null) {
            console.log("bruh 2")
            return;
        }

        return (
            <TabWindowComponent
                self={self}
            />
        );
    } else if (self instanceof WindowGroup) {
        return (
            <WindowGroupComponent
                self={self}
            />
        )
    } else {
        console.log("failed to render")
    }
};

export default WindowContainer;