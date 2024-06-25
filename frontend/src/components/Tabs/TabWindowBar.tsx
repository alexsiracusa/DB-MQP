import "../../styles/TabWindowBar.css"

import TabWindow from "./TabWindow.tsx";
import TabDropdown from "./TabDropdown.tsx"
import {Direction, Position} from "./TabContainer.tsx";

type TabWindowBarProps = {
    self: TabWindow;
    addSibling: (self: TabWindow, direction: Direction, position: Position) => void;
    deleteSelf: (self: TabWindow) => void;
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