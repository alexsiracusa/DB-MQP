import QueryTab, {FileType} from "./QueryTab.tsx";
import TabWindow from "../../TabObject/TabWindow/TabWindow.tsx";
import TranslatedQueryTab from "./TranslatedQueryTab.tsx"

class UserQueryTab extends QueryTab {
    translations: Record<FileType, TranslatedQueryTab> = {} as Record<FileType, TranslatedQueryTab>;

    constructor(
        name: string,
        fileType: FileType,
        parent: TabWindow,
        forceUpdate: () => void = () => {},
        updateCode: () => void = () => {},
    ) {
        super(name, fileType, parent, forceUpdate, updateCode);
    }

    createTranslationTab(fileType: FileType): TranslatedQueryTab {
        const translationTab = new TranslatedQueryTab("Translation", fileType, this.parent, this);
        this.translations[fileType] = translationTab;
        return translationTab;
    }

    translate(fileType: FileType) {
        // if translation already exists, don't make a new one
        const existingTranslation = this.translations[fileType];
        if (existingTranslation !== undefined) {
            existingTranslation.select()
            return;
        }

        // otherwise create translation
        let sibling = this.parent.sibling("horizontal", "after");
        if (!(sibling instanceof TabWindow)) {
            sibling = this.parent.addSibling("horizontal", "after", false);
            (sibling as TabWindow).contents = []
        }
        const window = (sibling as TabWindow);
        const tab = this.createTranslationTab(fileType);
        window.addTab(tab, true)
    }
}

export default UserQueryTab