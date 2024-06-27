import "../../../styles/TabContainer.css"

import TabWindow from "./TabWindow.tsx";
import TabWindowBar from "../TabComponents/TabWindowBar.tsx";


type TabWindowGroupComponentProps = {
    self: TabWindow
}
const TabWindowComponent = (props: TabWindowGroupComponentProps) => {
    const self = props.self;

    return (
        <div className={"tab-content"}>
            <TabWindowBar
                self={self}
            />
        </div>
    );
}

export default TabWindowComponent;