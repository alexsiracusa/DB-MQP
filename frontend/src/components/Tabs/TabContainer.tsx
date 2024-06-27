import '../../styles/TabContainer.css'
import '../../styles/Gutters.css'

import React from 'react';
import TabObject from "./TabObject.tsx";
import TabWindowGroup from "./TabWindowGroup.tsx";
import TabWindow from "./TabWindow.tsx";

import TabWindowGroupComponent from "./TabWindowGroupComponent.tsx"
import TabWindowComponent from "./TabWindowComponent.tsx";

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

    if (self instanceof TabWindow) {
        if (self.parent == null) {
            console.log("bruh 2")
            return;
        }

        self.forceUpdate = self.parent.forceUpdate;

        return (
            <TabWindowComponent
                self={self}
            />
        );
    } else if (self instanceof TabWindowGroup) {
        self.forceUpdate = forceUpdate;

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