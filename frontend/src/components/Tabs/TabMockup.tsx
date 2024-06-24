// @ts-nocheck

import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import React from 'react';
import TabWindowBar from "./TabWindowBar.tsx";
import '../../styles/TranslatorMockup.css'

export type Direction = "horizontal" | "vertical" | undefined;
export type Position = "before" | "after" | undefined;

class TabContent {
    name: string

    constructor(name: string) {
        this.name = name
    }
}

export abstract class TabObject {
    id: number = Math.floor(Math.random() * 99);
}

export class TabWindow extends TabObject {
    contents: TabContent[]

    constructor() {
        super();
        this.contents = []
    }
}

export class TabWindowGroup extends TabObject {
    children: TabObject[]
    direction: Direction

    constructor(direction: "horizontal" | "vertical" | undefined) {
        super();
        this.children = []
        this.direction = direction
    }
}

type TabMockupProps = {
    childObject: TabObject;
    addSibling: (self: TabWindow, direction: Direction, position: Position) => void;
    deleteSelf: (self: TabWindow) => void;
}

// const TabMockup = React.memo((props: TabMockupProps) => {
const TabMockup = (props: TabMockupProps) => {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const tabObject = props.childObject

    function addSibling(self: TabWindow, direction: Direction, position: Position) {
        if (tabObject instanceof TabWindowGroup && tabObject.direction != null) {
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
        if (tabObject instanceof TabWindowGroup && tabObject.direction != null) {
            console.log("deleting " + self.id)

            const index = tabObject.children.indexOf(self);
            tabObject.children.splice(index, 1)
            if (tabObject.children.length === 1) {

            }

            forceUpdate()
        } else {
            console.log("not a tab window")
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
                                />
                            </Panel>
                        )
                        console.log(i, tabObject.children.length)
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