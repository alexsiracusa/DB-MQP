import "../../styles/TabWindowBar.css"

import TabWindow from "./TabWindow.tsx";
import TabDropdown from "./TabDropdown.tsx"

type TabWindowBarProps = {
    self: TabWindow;
}

const TabWindowBar = (props: TabWindowBarProps) => {

    return (
        <div className="tab-window-bar">
            <div className="tabs">
                {props.self.id.slice(0,6)}
            </div>
            <div className="buttons">
                <TabDropdown {...props}/>
            </div>
        </div>
    )
}

export default TabWindowBar