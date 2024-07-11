import {DatabaseLanguage} from "../../../../../DatabaseLanguage.tsx";
import QueryTab from "../QueryTab.tsx";
import TabWindow from "../../../Windows/TabWindow/TabWindow.tsx";
import UserQueryTab from "../UserQueryTab/UserQueryTab.tsx";

class TranslatedQueryTab extends QueryTab {
    original: UserQueryTab
    loaded: boolean = false

    constructor(
        name: string,
        language: DatabaseLanguage,
        parent: TabWindow,
        original: UserQueryTab,
        forceUpdate: () => Promise<void> = () => new Promise(() => {}),
        updateCode: () => Promise<void> = () => new Promise(() => {}),
    ) {
        super(name, language, parent, forceUpdate, updateCode);
        this.original = original;
        this.locked = true;
    }

    override async delete(
        update: boolean  = true
    ) {
        await super.delete(update)
        delete this.original.translations[this.language]
    }

}

export default TranslatedQueryTab