import React from 'react';
import TabWindowBar from "./TabWindowBar.tsx";
import Split from "react-split";
import '../../styles/TranslatorMockup.css'


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
    direction: "horizontal" | "vertical" | undefined

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
}


const TabMockup = React.memo((props: TabMockupProps) => {
        console.log('content rendered');
        const tabObject = props.childObject

        if (tabObject instanceof TabWindow) {
            return (
                <div className={"tab-content"}>
                    <TabWindowBar/>
                </div>
            );
        }
        else if (tabObject instanceof TabWindowGroup) {
            return (
                <Split
                    className={"tab-split-container-" + tabObject.direction}
                    direction={tabObject.direction}
                    gutterAlign="start"
                    sizes={[50, 50]}
                    minSize={6}
                    gutterSize={6}
                >
                    {
                        tabObject.children.map((childObject, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <TabMockup childObject={childObject}/>
                                </React.Fragment>
                            )
                        })
                    }
                </Split>
            )
        }
        else {
            console.log("oops")
        }

    }, (prevProps, nextProps) => {
        if (prevProps !== nextProps) {
            return false; // props are not equal -> update the component
        }
        return prevProps.childObject.equal(nextProps.childObject);
    }
);

export default TabMockup;