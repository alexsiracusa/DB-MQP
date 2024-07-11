import Window from "../Window.tsx";
import Tab from "../../Tabs/Tab.tsx";
import WindowGroup from "../WindowGroup/WindowGroup.tsx";
import {Direction, Position} from "../../WindowContainer.tsx";

import NewTab from "../../Tabs/NewTab/NewTab.tsx";
import UserQueryTab from "../../Tabs/QueryTab/UserQueryTab.tsx";

export default class TabWindow extends Window {
    contents: Tab[];
    selected: Tab;

    constructor(
        parent: WindowGroup,
        forceUpdate: () => void = () => {},
    ) {
        super(parent, forceUpdate);
        const tab1 = new NewTab("New Tab", this);
        const tab2 = new UserQueryTab("Query Tab", "PL/pgSQL", this);

        this.contents = [tab1, tab2];
        this.selected = tab2;
    }

    addTab(
        tab: Tab = new NewTab("New Tab", this),
        update: boolean = true
    ) {
        tab.parent = this;
        this.contents.push(tab);
        this.selected = tab;
        if (update) {
            this.parent?.forceUpdate();
        }
    }

    addSibling(
        direction: Direction,
        position: Position,
        update: boolean = true
    ): TabWindow {
        if (this.parent === null) {
            console.log("addSibling cannot find its parent: " + this.id)
            return this;
        }

        console.log("added sibling for " + this.id)
        const originalParent = this.parent;

        const newWindow = new TabWindow(this.parent);
        const index = this.parent.children.indexOf(this);

        if (this.parent.direction === direction) {
            const offset = (position === "before") ? 0 : 1;
            this.parent.children.splice(index + offset, 0, newWindow)
        } else {
            const newGroup = new WindowGroup(this.parent, direction);
            newGroup.children = (position === "before") ? [newWindow, this] : [this, newWindow];
            this.parent.children[index] = newGroup;

            this.parent = newGroup;
            newWindow.parent = newGroup;
        }

        if (update) {
            originalParent.forceUpdate()
        }
        return newWindow;
    }

    sibling(
        direction: Direction,
        position: Position,
    ): Window | undefined {
        if (this.parent === null) {
            console.log("addSibling cannot find its parent: " + this.id)
            return undefined;
        }

        const offset = (position === "before") ? -1 : 1;
        const index = this.parent?.children.indexOf(this) + offset;

        if (this.parent.direction !== direction ||
            index === undefined ||
            index < 0 ||
            index > this.parent.children.length - 1
        ) {
            return undefined;
        }
        return this.parent.children[index]
    }

    deleteSelf(
        update: boolean = true
    ) {
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

        if (update) {
            this.parent.forceUpdate()
        }
    }
}