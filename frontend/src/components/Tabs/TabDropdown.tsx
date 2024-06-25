import '../../styles/TabDropdown.css'

import React from "react";
import { useDetectClickOutside } from 'react-detect-click-outside';
import TabWindow from "./TabWindow.tsx";
import {Direction, Position} from "./TabContainer.tsx";
import MenuIcon from "../../assets/Icons/MenuIcon.svg";
import PaneRight from "../../assets/Icons/PaneRight.svg";
import PaneLeft from "../../assets/Icons/PaneLeft.svg";
import PaneUp from "../../assets/Icons/PaneUp.svg";
import PaneDown from "../../assets/Icons/PaneDown.svg";



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
                <img src={MenuIcon}/>
            </button>

            {isVisible ? (
                <div className="dropdown-container">
                    <div className="dropdown-content">
                        <button onClick={() => {
                            props.addSibling(props.self, "horizontal", "after")
                            setIsVisible(false)
                        }}>
                            <div className="row">
                                <img src={PaneRight}/>
                                <p>Insert Right</p>
                            </div>
                        </button>

                        <button onClick={() => {
                            props.addSibling(props.self, "horizontal", "before")
                            setIsVisible(false)
                        }}>
                            <div className="row">
                                <img src={PaneLeft}/>
                                <p>Insert Left</p>
                            </div>
                        </button>

                        <button onClick={() => {
                            props.addSibling(props.self, "vertical", "before")
                            setIsVisible(false)
                        }}>
                            <div className="row">
                                <img src={PaneUp}/>
                                <p>Insert Up</p>
                            </div>
                        </button>

                        <button onClick={() => {
                            props.addSibling(props.self, "vertical", "after")
                            setIsVisible(false)
                        }}>
                            <div className="row">
                                <img src={PaneDown}/>
                                <p>Insert Down</p>
                            </div>
                        </button>
                        <button onClick={() => {
                            props.deleteSelf(props.self)
                            setIsVisible(false)
                        }}>
                            <div className="row">
                                <p>Delete</p>
                            </div>
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default TabDropdown;