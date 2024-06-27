import TabObject from "./TabObject.tsx";
import TabContent from "./TabContent.tsx";
import TabWindowGroup from "./TabWindowGroup.tsx";
import {Direction, Position} from "./TabContainer.tsx";

export default class TabWindow extends TabObject {
    contents: TabContent[]

    constructor(
        parent: TabWindowGroup,
        forceUpdate: () => void = () => {},
    ) {
        super(parent, forceUpdate);
        this.contents = [];
    }

    addSibling(direction: Direction, position: Position) {
        if (this.parent === null) {
            console.log("addSibling cannot find its parent: " + this.id)
            return;
        }

        console.log("added sibling for " + this.id)

        const newTab = new TabWindow(this.parent, this.forceUpdate);
        const index = this.parent.children.indexOf(this);

        if (this.parent.direction === direction) {
            const offset = (position === "before") ? 0 : 1;
            this.parent.children.splice(index + offset, 0, newTab)
        } else {
            const newGroup = new TabWindowGroup(this.parent, direction);
            newGroup.children = (position === "before") ? [newTab, this] : [this, newTab];
            this.parent.children[index] = newGroup;

            this.parent = newGroup;
            newTab.parent = newGroup;
        }

        this.forceUpdate()
    }

    deleteSelf() {
        if (this.parent == null) {
            console.log("deleteSelf cannot find its parent: " + this.id)
            return;
        }

        console.log("deleting " + this.id)
        // console.log(this.parent)
        // console.log(this)

        const index = this.parent.children.indexOf(this);
        this.parent.children.splice(index, 1)

        if (this.parent.children.length <= 1) {
            this.parent.flattenSelf();
        }

        console.log(this.parent)

        this.forceUpdate()
    }
}