import TabContent from "./TabContent.tsx";
import NewTab from "./NewTab/NewTab.tsx";
import NewTabComponent from "./NewTab/NewTabComponent.tsx";
import QueryTab from "./QueryTab/QueryTab.tsx";
import QueryTabComponent from "./QueryTab/QueryTabComponent.tsx";
import React from "react";

type TabContentComponentProps = {
    self: TabContent
}

const TabContentComponent = (props: TabContentComponentProps) => {
    const [, updateState] = React.useState({});
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const self = props.self;

    // update entire tab content
    self.forceUpdate = forceUpdate

    if (self instanceof NewTab) {
        return <NewTabComponent self={self}/>
    } else if (self instanceof QueryTab) {
        return <QueryTabComponent self={self}/>
    }
}

export default TabContentComponent;