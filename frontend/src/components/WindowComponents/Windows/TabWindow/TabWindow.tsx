import Window from "../Window.tsx";
import Tab from "../../Tabs/Tab.tsx";
import WindowGroup from "../WindowGroup/WindowGroup.tsx";
import {Direction, Position} from "../../WindowContainer.tsx";

import NewTab from "../../Tabs/NewTab/NewTab.tsx";
import type monaco from "monaco-editor";

export default class TabWindow extends Window {
    contents: Tab[];
    selected: Tab;

    // used for QueryTabs to update their code in special circumstances
    // is done on a per-window basis because monaco seems to reuse stuff
    // gets updated every time a new editor is mounted
    editor: monaco.editor.IStandaloneCodeEditor | null = null;
    editorOwner: Tab | null = null;

    constructor(
        parent: WindowGroup,
        forceUpdate: () => Promise<void> = () => new Promise(() => {}),
    ) {
        super(parent, forceUpdate);
        const tab = new NewTab("New Tab", this);
        this.contents = [tab];
        this.selected = tab;
        this.editorOwner = tab;
    }

    setContent(content: Tab[], selected: Tab | null = null) {
        if (content.length < 0) {
            throw Error("can't set empty content")
        }
        this.contents = content
        this.selected = (selected) ? selected : this.contents[0]
        this.editorOwner = selected;
    }

    async addTab(
        tab: Tab = new NewTab("New Tab", this),
        update: boolean = true
    ) {
        tab.parent = this;
        this.contents.push(tab);
        await tab.select(false);
        if (update) {
            await this.parent?.forceUpdate();
        }
    }

    async addSibling(
        direction: Direction,
        position: Position,
        update: boolean = true
    ): Promise<TabWindow> {
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
            await originalParent.forceUpdate()
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

    async deleteSelf(
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
            await this.parent.forceUpdate()
        }
    }
}