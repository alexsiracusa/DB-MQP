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
        if (update) {
            await this.parent.forceUpdate();
        }
    }

    async delete(
        update: boolean  = true
    ) {
        const index = this.parent.contents.indexOf(this);
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
        console.log("deleted " + this.name);
    }
}

export default Tab;