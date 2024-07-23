import Tab from "../Tab.tsx";
import TabWindow from "../../Windows/TabWindow/TabWindow.tsx";
import UserQueryTab from "../QueryTab/UserQueryTab.tsx";
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

    async toBlankQueryTab(
        type: DatabaseLanguage = "PL/pgSQL"
    ) {
        const tab = new UserQueryTab(null, type, this.parent);
        await this.replaceWith(tab);
    }

    async toAIQueryTab(
        type: DatabaseLanguage = "PL/pgSQL"
    ) {
        const tab = UserQueryTab.generatedQuery(type, this.parent);
        await this.replaceWith(tab);
    }

}

export default NewTab;