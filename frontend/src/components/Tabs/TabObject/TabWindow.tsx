import TabObject from "./TabObject.tsx";
import TabContent from "../TabContent/TabContent.tsx";
import TabWindowGroup from "./TabWindowGroup.tsx";
import {Direction, Position} from "../TabContainer.tsx";
import NewTab from "../TabContent/NewTab.tsx";

export default class TabWindow extends TabObject {
    contents: TabContent[];
    selected: TabContent;

    constructor(
        parent: TabWindowGroup,
        forceUpdate: () => void = () => {},
    ) {
        super(parent, forceUpdate);
        const tab = new NewTab("New Tab", this);

        this.contents = [tab];
        this.selected = tab;
    }

    addSibling(direction: Direction, position: Position) {
        if (this.parent === null) {
            console.log("addSibling cannot find its parent: " + this.id)
            return;
        }

        console.log("added sibling for " + this.id)

        const newTab = new TabWindow(this.parent);
        const index = this.parent.children.indexOf(this);

        if (this.parent.direction === direction) {
            const offset = (position === "before") ? 0 : 1;
            this.parent.children.splice(index + offset, 0, newTab)

            this.parent.forceUpdate()
        } else {
            const newGroup = new TabWindowGroup(this.parent, direction);
            newGroup.children = (position === "before") ? [newTab, this] : [this, newTab];
            this.parent.children[index] = newGroup;

            this.parent.forceUpdate()
            this.parent = newGroup;
            newTab.parent = newGroup;
        }
    }

    deleteSelf() {
        if (this.parent == null) {
            console.log("deleteSelf cannot find its parent: " + this.id)
            return;
        }

        console.log("deleting " + this.id)

        const index = this.parent.children.indexOf(this);
        this.parent.children.splice(index, 1)

        if (this.parent.children.length <= 1) {
            this.parent.flattenSelf();
        }

        this.parent.forceUpdate()
    }
}