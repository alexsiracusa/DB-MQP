import TabContent from "../TabContent.tsx";
import TabWindow from "../../TabObject/TabWindow/TabWindow.tsx";
import QueryTab from "../QueryTab/QueryTab.tsx";

class NewTab extends TabContent {

    constructor(name: string, parent: TabWindow) {
        super(name, parent);
    }

    private replaceWith(tab: TabContent) {
        tab.parent = this.parent;
        this.parent.contents[this.index()] = tab;
        tab.select()
    }

    toQueryTab() {
        const tab = new QueryTab("Query", this.parent);
        this.replaceWith(tab);
    }

}

export default NewTab;