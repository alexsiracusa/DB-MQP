import '../../styles/TabDropdown.css'

import React from "react";
import { useDetectClickOutside } from 'react-detect-click-outside';
import TabWindow from "./TabWindow.tsx";
import {Direction, Position} from "./TabContainer.tsx";


type TabDropdownProps = {
    self: TabWindow;
    addSibling: (self: TabWindow, direction: Direction, position: Position) => void;
    deleteSelf: (self: TabWindow) => void;
}

const TabDropdown = (props: TabDropdownProps) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const closeDropdown = () => {
        if (isVisible) {
            setIsVisible(false);
        }
    }
    const ref = useDetectClickOutside({ onTriggered: closeDropdown });

    return (
        <div className="tab-dropdown" ref={ref}>
            <button
                onClick={() => {
                    setIsVisible(!isVisible)
                }}
            >
                Dropdown
            </button>
            {isVisible ? (
                <div className="dropdown-container">
                    <div className="dropdown-content">
                        <button onClick={() => {
                            props.addSibling(props.self, "horizontal", "after")
                            setIsVisible(false)
                        }}>
                            Pane Right
                        </button>

                        <button onClick={() => {
                            props.addSibling(props.self, "horizontal", "before")
                            setIsVisible(false)
                        }}>
                            Pane Left
                        </button>

                        <button onClick={() => {
                            props.addSibling(props.self, "vertical", "before")
                            setIsVisible(false)
                        }}>
                            Pane Up
                        </button>

                        <button onClick={() => {
                            props.addSibling(props.self, "vertical", "after")
                            setIsVisible(false)
                        }}>
                            Pane Down
                        </button>
                        <button onClick={() => {
                            props.deleteSelf(props.self)
                            setIsVisible(false)
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