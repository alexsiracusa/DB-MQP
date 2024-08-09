import '../../../../styles/TabContainer.css'

import TabWindow from "./TabWindow.tsx";
import TabWindowBar from "./TabWindowBar.tsx";
import TabComponent from "../../Tabs/TabComponent.tsx";


type TabWindowGroupComponentProps = {
    self: TabWindow
}

const TabWindowComponent = (props: TabWindowGroupComponentProps) => {
    const self = props.self;

    return (
        <div className={"tab-window-container"}>
            <TabWindowBar self={self}/>
            <TabComponent self={self.selected}/>
        </div>
    );
}

export default TabWindowComponent;