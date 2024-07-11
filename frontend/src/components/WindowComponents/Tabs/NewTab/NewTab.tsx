import Tab from "../Tab.tsx";
import TabWindow from "../../Windows/TabWindow/TabWindow.tsx";
import UserQueryTab from "../QueryTab/UserQueryTab/UserQueryTab.tsx";
import {DatabaseLanguage} from "../../../../DatabaseLanguage.tsx";

class NewTab extends Tab {

    constructor(name: string, parent: TabWindow) {
        super(name, parent);
    }

    private async replaceWith(tab: Tab) {
        tab.parent = this.parent;
        this.parent.contents[this.index()] = tab;
        await tab.select()
    }

    async toQueryTab(
        type: DatabaseLanguage = "PL/pgSQL"
    ) {
        const tab = new UserQueryTab("Query", type, this.parent);
        await this.replaceWith(tab);
    }

}

export default NewTab;