import '../../../styles/TabContainer.css'

import TabWindow from "./TabWindow.tsx";
import TabWindowBar from "./TabWindowBar/TabWindowBar.tsx";
import NewTab from "../TabContent/NewTab/NewTab.tsx";
import NewTabComponent from "../TabContent/NewTab/NewTabComponent.tsx";
import QueryTab from "../TabContent/QueryTab/QueryTab.tsx";
import QueryTabComponent from "../TabContent/QueryTab/QueryTabComponent.tsx";


type TabWindowGroupComponentProps = {
    self: TabWindow
}
const TabWindowComponent = (props: TabWindowGroupComponentProps) => {
    const self = props.self;

    function tabContent() {
        if (self.selected instanceof NewTab) {
            return <NewTabComponent self={self.selected}/>
        }
        else if (self.selected instanceof QueryTab) {
            return <QueryTabComponent self={self.selected}/>
        }
    }

    return (
        <div className={"tab-window-container"}>
            <TabWindowBar
                self={self}
            />
            {tabContent()}
        </div>
    );
}

export default TabWindowComponent;