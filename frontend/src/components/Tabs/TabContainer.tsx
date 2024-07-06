import '../../styles/TabContainer.css'
import '../../styles/Gutters.css'

import React from 'react';
import TabObject from "./TabObject/TabObject.tsx";
import TabWindowGroup from "./TabObject/TabWindowGroup.tsx";
import TabWindow from "./TabObject/TabWindow.tsx";

import TabWindowGroupComponent from "./TabObject/TabWindowGroupComponent.tsx"
import TabWindowComponent from "./TabObject/TabWindowComponent.tsx";

export type Direction = "horizontal" | "vertical";
export type Position = "before" | "after";


type TabMockupProps = {
    self: TabObject;
}

const TabContainer = (props: TabMockupProps) => {
    const [, updateState] = React.useState({});
    const forceUpdate = React.useCallback(() => updateState({}), []);
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
    } else if (self instanceof TabWindowGroup) {
        return (
            <TabWindowGroupComponent
                self={self}
            />
        )
    } else {
        console.log("failed to render")
    }
};

export default TabContainer;