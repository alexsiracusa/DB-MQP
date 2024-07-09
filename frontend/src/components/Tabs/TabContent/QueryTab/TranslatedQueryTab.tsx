import QueryTab, {FileType} from "./QueryTab.tsx";
import TabWindow from "../../TabObject/TabWindow/TabWindow.tsx";
import UserQueryTab from "./UserQueryTab.tsx";

class TranslatedQueryTab extends QueryTab {
    original: UserQueryTab

    constructor(
        name: string,
        fileType: FileType,
        parent: TabWindow,
        original: UserQueryTab,
        forceUpdate: () => void = () => {},
        updateCode: () => void = () => {},
    ) {
        super(name, fileType, parent, forceUpdate, updateCode);
        this.original = original;
        this.locked = true;
    }

    override delete(
        update: boolean  = true
    ) {
        super.delete(update)
        delete this.original.translations[this.fileType]
    }

}

export default TranslatedQueryTab