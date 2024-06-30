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
        const tab1 = new NewTab("Tab 1", this);
        const tab2 = new NewTab("Tab 2", this);

        this.contents = [tab1, tab2];
        this.selected = tab1;
    }

    addTab(tab: TabContent = new NewTab("New Tab", this)) {
        tab.parent = this;
        this.contents.push(tab);
        this.selected = tab;
        this.parent?.forceUpdate();
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