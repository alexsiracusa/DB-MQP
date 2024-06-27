import "../../../styles/TabContainer.css"

import TabWindow from "./TabWindow.tsx";
import TabWindowBar from "../TabComponents/TabWindowBar.tsx";
import NewTab from "../TabContent/NewTab.tsx";
import NewTabComponent from "../TabContent/NewTabComponent.tsx";


type TabWindowGroupComponentProps = {
    self: TabWindow
}
const TabWindowComponent = (props: TabWindowGroupComponentProps) => {
    const self = props.self;

    function tabContent() {
        if (self.selected instanceof NewTab) {
            return <NewTabComponent self={self.selected}/>
        }
    }

    return (
        <div className={"tab-content"}>
            <TabWindowBar
                self={self}
            />
            {tabContent()}
        </div>
    );
}

export default TabWindowComponent;