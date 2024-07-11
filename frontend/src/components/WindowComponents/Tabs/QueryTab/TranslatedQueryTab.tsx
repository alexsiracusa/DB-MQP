import {DatabaseLanguage} from "../../../../DatabaseLanguage.tsx";
import QueryTab from "./QueryTab.tsx";
import TabWindow from "../../Windows/TabWindow/TabWindow.tsx";
import UserQueryTab from "./UserQueryTab.tsx";

class TranslatedQueryTab extends QueryTab {
    original: UserQueryTab

    constructor(
        name: string,
        language: DatabaseLanguage,
        parent: TabWindow,
        original: UserQueryTab,
        forceUpdate: () => void = () => {},
        updateCode: () => void = () => {},
    ) {
        super(name, language, parent, forceUpdate, updateCode);
        this.original = original;
        this.locked = true;
    }

    override delete(
        update: boolean  = true
    ) {
        super.delete(update)
        delete this.original.translations[this.language]
    }

}

export default TranslatedQueryTab