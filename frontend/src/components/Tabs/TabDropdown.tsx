import '../../styles/TabDropdown.css'

import React from "react";
import TabWindow from "./TabWindow.tsx";
import {Direction, Position} from "./TabContainer.tsx";


type TabDropdownProps = {
    self: TabWindow;
    addSibling: (self: TabWindow, direction: Direction, position: Position) => void;
    deleteSelf: (self: TabWindow) => void;
}

const TabDropdown = (props: TabDropdownProps) => {
    const [isVisible, setIsVisible] = React.useState(false);

    return (
        <div className={"tab-dropdown"}>
            <button onClick={() => {
                setIsVisible(!isVisible)
            }}>
                Dropdown
            </button>
            {isVisible ? (
                <div className="dropdown-container">
                    <div className={"dropdown-content"}>
                        <button onClick={() => {
                            props.addSibling(props.self, "horizontal", "after")
                        }}>
                            Pane Right
                        </button>

                        <button onClick={() => {
                            props.addSibling(props.self, "horizontal", "before")
                        }}>
                            Pane Left
                        </button>

                        <button onClick={() => {
                            props.addSibling(props.self, "vertical", "before")
                        }}>
                            Pane Up
                        </button>

                        <button onClick={() => {
                            props.addSibling(props.self, "vertical", "after")
                        }}>
                            Pane Down
                        </button>
                        <button onClick={() => {
                            props.deleteSelf(props.self)
                        }}>
                            Delete
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default TabDropdown;