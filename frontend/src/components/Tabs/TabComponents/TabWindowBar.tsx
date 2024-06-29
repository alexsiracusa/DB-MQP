import "../../../styles/TabWindowBar.css"

import TabWindow from "../TabObject/TabWindow.tsx";
import TabDropdown from "./TabDropdown.tsx"
import React from "react";
import TabButton from "./TabButton.tsx";

type TabWindowBarProps = {
    self: TabWindow;
}

const TabWindowBar = (props: TabWindowBarProps) => {
    const self = props.self;

    return (
        <div className="tab-window-bar">
            <div className="tabs">
                {/*{props.self.id.slice(0,6)}*/}
                {
                    self.contents.map((tab, i) => {
                        return (
                            <React.Fragment key={i}>
                                <TabButton
                                    self={tab}
                                />

                                <div className={"divider"}/>
                            </React.Fragment>
                        )
                    })
                }
            </div>
            <div className="buttons">
                <TabDropdown {...props}/>
            </div>
        </div>
    )
}

export default TabWindowBar