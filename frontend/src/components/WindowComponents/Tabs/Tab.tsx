import TabWindow from "../Windows/TabWindow/TabWindow.tsx";
import {v4 as uuid} from "uuid";

abstract class Tab {
    id: string = uuid();
    name: string;
    parent: TabWindow;
    forceUpdate: () => Promise<void>;

    protected constructor(
        name: string,
        parent: TabWindow,
        forceUpdate: () => Promise<void> = () => new Promise(() => {}),
    ) {
        this.name = name;
        this.parent = parent;
        this.forceUpdate = forceUpdate
    }

    protected index(): number {
        return this.parent.contents.indexOf(this);
    }

    async select(
        update: boolean  = true
    ) {
        this.parent.selected = this;
        this.parent.editorOwner = null;
        if (update) {
            await this.parent.forceUpdate();
        }
        this.parent.editorOwner = this;
    }

    async delete(
        update: boolean  = true
    ) {
        const index = this.index();
        this.parent.contents.splice(index, 1);

        // delete window if this is the last tab
        if (this.parent.contents.length === 0) {
            await this.parent.deleteSelf(update);
            return;
        }

        // change selected tab if needed
        if (this.parent.selected === this) {
            this.parent.selected = this.parent.contents[Math.max(0, index - 1)];
        }

        if (update) {
            await this.parent.forceUpdate();
        }
    }
}

export default Tab;