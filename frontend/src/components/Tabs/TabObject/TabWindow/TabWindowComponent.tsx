import '../../../../styles/TabContainer.css'

import TabWindow from "./TabWindow.tsx";
import TabWindowBar from "./TabWindowBar.tsx";
import TabContentComponent from "../../TabContent/TabContentComponent.tsx";


type TabWindowGroupComponentProps = {
    self: TabWindow
}

const TabWindowComponent = (props: TabWindowGroupComponentProps) => {
    const self = props.self;

    return (
        <div className={"tab-window-container"}>
            <TabWindowBar self={self}/>
            <TabContentComponent self={self.selected}/>
        </div>
    );
}

export default TabWindowComponent;