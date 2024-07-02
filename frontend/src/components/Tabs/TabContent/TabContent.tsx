import TabWindow from "../TabObject/TabWindow.tsx";
import {v4 as uuid} from "uuid";

abstract class TabContent {
    id: string = uuid();

    name: string;
    parent: TabWindow;

    protected constructor(name: string, parent: TabWindow) {
        this.name = name;
        this.parent = parent;
    }

    select() {
        this.parent.selected = this;
        this.parent.forceUpdate();
        console.log("selected " + this.name);
    }

    delete() {
        const index = this.parent.contents.indexOf(this);
        this.parent.contents.splice(index, 1);

        // delete window if this is the last tab
        if (this.parent.contents.length === 0) {
            this.parent.deleteSelf();
            return;
        }

        // change selected tab if needed
        if (this.parent.selected === this) {
            this.parent.selected = this.parent.contents[Math.max(0, index - 1)];
        }

        this.parent.forceUpdate();
        console.log("deleted " + this.name);
    }
}

export default TabContent;