import "../../../../styles/TabContainer.css"

import WindowGroup from "./WindowGroup.tsx";
import WindowContainer from "../../WindowContainer.tsx";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import React from "react";


type TabWindowGroupComponentProps = {
    self: WindowGroup
}
const WindowGroupComponent = (props: TabWindowGroupComponentProps) => {
    const self = props.self;

    return (
        <PanelGroup
            direction={self.direction}
            style={{
                minWidth: 0,
                minHeight: 0
            }}
        >
            {
                self.children.map((child, i) => {
                    return (
                        <React.Fragment key={i}>
                            <Panel
                                className={"tab-window"}
                                id={i.toString()}
                                order={i}
                                style={{
                                    minWidth: 0,
                                    minHeight: 0
                                }}
                            >
                                <WindowContainer
                                    self={child}
                                />
                            </Panel>

                            {i < self.children.length - 1 &&
                                <PanelResizeHandle
                                    className={"gutter gutter-" + self.direction}
                                />
                            }
                        </React.Fragment>
                    )
                })
            }
        </PanelGroup>
    )
}

export default WindowGroupComponent;