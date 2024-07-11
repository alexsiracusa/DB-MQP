import {DatabaseLanguage} from "../../../../../DatabaseLanguage.tsx";
import QueryTab from "../QueryTab.tsx";
import TabWindow from "../../../Windows/TabWindow/TabWindow.tsx";
import TranslatedQueryTab from "../TranslatedQueryTab/TranslatedQueryTab.tsx"

class UserQueryTab extends QueryTab {
    translations: Record<DatabaseLanguage, TranslatedQueryTab> = {} as Record<DatabaseLanguage, TranslatedQueryTab>;

    constructor(
        name: string,
        language: DatabaseLanguage,
        parent: TabWindow,
        forceUpdate: () => void = () => {},
        updateCode: () => void = () => {},
    ) {
        super(name, language, parent, forceUpdate, updateCode);
    }

    createTranslationTab(language: DatabaseLanguage): TranslatedQueryTab {
        const translationTab = new TranslatedQueryTab("Translation", language, this.parent, this);
        this.translations[language] = translationTab;
        return translationTab;
    }

    translate(language: DatabaseLanguage) {
        // if translation already exists, don't make a new one
        const existingTranslation = this.translations[language];
        if (existingTranslation !== undefined) {
            existingTranslation.select()
            return;
        }

        // otherwise create translation
        let sibling = this.parent.sibling("horizontal", "after");
        if (!(sibling instanceof TabWindow)) {
            sibling = this.parent.addSibling("horizontal", "after", true);
            (sibling as TabWindow).contents = []
        }
        const window = (sibling as TabWindow);
        const tab = this.createTranslationTab(language);
        window.addTab(tab, true)
    }
}

export default UserQueryTab