import "../../../styles/TabWindowBar.css"

import TabWindow from "../TabObject/TabWindow.tsx";
import TabDropdown from "./TabDropdown.tsx"
import TabButton from "./TabButton.tsx";
import PlusButton from "./PlusButton.tsx";
import React from "react";


type TabWindowBarProps = {
    self: TabWindow;
}

const TabWindowBar = (props: TabWindowBarProps) => {
    const self = props.self;

    return (
        <div className="tab-window-bar">
            <div className="tabs">
                {
                    self.contents.map((tab, i) => {
                        return (
                            <React.Fragment key={i}>
                                <TabButton
                                    self={tab}
                                />

                                {i < self.contents.length - 1 &&
                                    <div className={"divider"}/>
                                }
                            </React.Fragment>
                        )
                    })
                }
            </div>
            <div className="buttons">
                <div className="buttons-left">
                    <PlusButton self={self}/>
                </div>

                <div className="buttons-right">
                    <TabDropdown self={self}/>
                </div>
            </div>
        </div>
    )
}

export default TabWindowBar