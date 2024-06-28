import TabWindow from "../TabObject/TabWindow.tsx";

abstract class TabContent {
    name: string;
    parent: TabWindow;

    protected constructor(name: string, parent: TabWindow) {
        this.name = name;
        this.parent = parent;
    }

    select() {
        this.parent.selected = this;
        this.parent.forceUpdate();
        console.log("selected " + this.name)
    }
}

export default TabContent;