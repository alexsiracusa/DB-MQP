// @ts-nocheck

import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import React from 'react';
import TabWindowBar from "./TabWindowBar.tsx";
import TabObject from "./TabObject.tsx";
import TabWindowGroup from "./TabWindowGroup.tsx";
import TabWindow from "./TabWindow.tsx";
import '../../styles/TranslatorMockup.css'

export type Direction = "horizontal" | "vertical" | undefined;
export type Position = "before" | "after" | undefined;



type TabMockupProps = {
    childObject: TabObject;
    addSibling: (self: TabWindow, direction: Direction, position: Position) => void;
    deleteSelf: (self: TabWindow) => void;
    flattenSelf: (self: TabWindowGroup) => void;
}

// const TabMockup = React.memo((props: TabMockupProps) => {
const TabMockup = (props: TabMockupProps) => {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const tabObject = props.childObject

    function addSibling(self: TabWindow, direction: Direction, position: Position) {
        if (tabObject instanceof TabWindowGroup) {
            console.log("added sibling")

            const newTab = new TabWindow();
            const index = tabObject.children.indexOf(self);

            if (tabObject.direction === direction) {
                const offset = (position === "before") ? 0 : 1;
                tabObject.children.splice(index + offset, 0, newTab)
            } else {
                const newGroup = new TabWindowGroup(direction);
                newGroup.children = (position === "before") ? [self, newTab] : [newTab, self];
                tabObject.children[index] = newGroup;
            }
            forceUpdate()
        } else {
            console.log("not a tab window")
        }
    }

    function deleteSelf(self: TabWindow) {
        if (tabObject instanceof TabWindowGroup) {
            console.log("deleting " + self.id)

            const index = tabObject.children.indexOf(self);
            tabObject.children.splice(index, 1)
            if (tabObject.children.length <= 1) {
                props.flattenSelf(tabObject);
            }

            forceUpdate()
        } else {
            console.log("not a tab window")
        }
    }

    function flattenSelf(self: TabWindowGroup) {
        if (tabObject instanceof TabWindowGroup) {
            console.log("flattening " + self.id + " into " + tabObject.id)

            const index = tabObject.children.indexOf(self);
            tabObject.children.splice(index, 1);
            for (const child: TabObject of self.children.reverse()) {
                tabObject.children.splice(index, 0, child)
                console.log("add child " + child.id)
            }

            forceUpdate()
        }
        else {
            console.log("not a tab window group")
        }
    }

    console.log(tabObject)

    if (tabObject instanceof TabWindow) {
        return (
            <div className={"tab-content"}>
                <TabWindowBar
                    self={tabObject}
                    addSibling={props.addSibling}
                    deleteSelf={props.deleteSelf}
                />
            </div>
        );
    } else if (tabObject instanceof TabWindowGroup) {
        return (
            <PanelGroup direction={tabObject.direction}>
                {
                    tabObject.children.map((childObject, i) => {
                        const content = (
                            <Panel className={"tab-content"} id={i}>
                                <TabMockup
                                    key={i}
                                    childObject={childObject}
                                    addSibling={addSibling}
                                    deleteSelf={deleteSelf}
                                    flattenSelf={flattenSelf}
                                />
                            </Panel>
                        )
                        if (i === tabObject.children.length - 1) {
                            return content
                        }
                        else {
                            return (
                                <>
                                    {content}
                                    <PanelResizeHandle className={"gutter gutter-" + tabObject.direction}/>
                                </>
                            )
                        }
                    })
                }
            </PanelGroup>
        )
    } else {
        console.log("failed to render")
    }
};

export default TabMockup;