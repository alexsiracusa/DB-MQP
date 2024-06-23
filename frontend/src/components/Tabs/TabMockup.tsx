import React, {useState} from 'react';
import TabWindowBar from "./TabWindowBar.tsx";
import Split from "react-split";
import '../../styles/TranslatorMockup.css'

export type Direction = "horizontal" | "vertical" | undefined;
export type Position = "before" | "after" | undefined;

class TabContent {
    name: string

    constructor(name: string) {
        this.name = name
    }

    equal(other: TabContent) {
        return this.name === other.name;
    }
}

export abstract class TabObject {
    abstract equal(other: TabObject): boolean;
    id: number = Math.floor(Math.random() * 99);
}

export class TabWindow extends TabObject {
    contents: TabContent[]

    constructor() {
        super();
        this.contents = []
    }

    equal(other: TabObject) {
        if (other instanceof TabWindow) {
            if (this.contents.length != other.contents.length) {
                return false;
            }
            this.contents.forEach((content, index) => {
                const otherContent = other.contents[index]
                if (!content.equal(otherContent)) {
                    return false
                }
            });
            return true;
        }
        return false;
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

    equal(other: TabObject): boolean {
        if (other instanceof TabWindowGroup) {
            if (this.children.length != other.children.length) {
                return false;
            }
            this.children.forEach((child, index) => {
                const otherChild = other.children[index]
                if (!child.equal(otherChild)) {
                    return false
                }
            });
            return true;
        }
        return false;
    }
}

type TabMockupProps = {
    childObject: TabObject
    addSibling: (self: TabWindow, direction: Direction, position: Position) => void;
}

// const TabMockup = React.memo((props: TabMockupProps) => {
const TabMockup = (props: TabMockupProps) => {
    const [i, updateState] = React.useState(0);
    const forceUpdate = React.useCallback(() => updateState(Math.random()), []);

    const [tabObject, setTabObject] = useState(props.childObject)

    // const tabObject = props.childObject

    function addSibling(self: TabWindow, direction: Direction, position: Position) {
        const tabWindowGroup = tabObject as TabWindowGroup;

        if (tabWindowGroup.direction != null) {
            console.log("added sibling")

            // const newTabWindowGroup: TabWindowGroup = {
            //     ...tabWindowGroup,
            //     equal: tabObject.equal
            // }
            const newTabWindowGroup = Object.create(tabObject);

            const newTab = new TabWindow();
            const index = newTabWindowGroup.children.indexOf(self);

            if (newTabWindowGroup.direction === direction) {
                newTabWindowGroup.children.push(newTab)
            } else {
                const newGroup = new TabWindowGroup(direction);
                newGroup.children = [self, newTab];
                newTabWindowGroup.children[index] = newGroup;
            }
            setTabObject(newTabWindowGroup);
            forceUpdate()
            console.log(tabObject)
        } else {
            console.log("not a tab window")
        }
    }

    // console.log("tabObject type = " + tabObject.constructor.name);
    // const tabWindowGroup = tabObject as TabWindowGroup;
    // const tabWindow = tabObject as TabWindow;

    // if (tabWindow.contents != null) {
    // if (tabObject.constructor.name == "TabWindow") {
    if (tabObject instanceof TabWindow) {
        console.log('rendered tabWindow ' + tabObject.id);
        return (
            <div className={"tab-content"}>
                <TabWindowBar
                    self={tabObject}
                    addSibling={props.addSibling}
                />
            </div>
        );
    }
    // else if (tabWindowGroup != null) {
    // else if (tabObject.constructor.name == "TabWindowGroup") {
    else if (tabObject instanceof TabWindowGroup) {
        console.log('rendered tabWindowGroup ' + tabObject.id);
        return (
            <Split
                className={"tab-split-container-" + tabObject.direction}
                direction={tabObject.direction}
                gutterAlign="start"
                minSize={6}
                gutterSize={6}
            >
                {
                    tabObject.children.map((childObject, i) => {
                        return (
                            <TabMockup
                                key={i}
                                childObject={childObject}
                                addSibling={addSibling}
                            />
                        )
                    })
                }
            </Split>
        )
    } else {
        console.log("failed to render")
    }
};
//     }, (prevProps, nextProps) => {
//         if (prevProps !== nextProps) {
//             return false; // props are not equal -> update the component
//         }
//         return prevProps.childObject.equal(nextProps.childObject);
//     }
// );

export default TabMockup;