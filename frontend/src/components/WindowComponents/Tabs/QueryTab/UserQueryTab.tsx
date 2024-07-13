import {DatabaseLanguage} from "../../../../DatabaseLanguage.tsx";
import QueryTab from "./QueryTab.tsx";
import TabWindow from "../../Windows/TabWindow/TabWindow.tsx";
import TranslatedQueryTab from "./TranslatedQueryTab.tsx"
import Chatbot from "../../../../api/ChatbotInstance.ts";

class UserQueryTab extends QueryTab {
    translations: Record<DatabaseLanguage, TranslatedQueryTab> = {} as Record<DatabaseLanguage, TranslatedQueryTab>;

    constructor(
        name:           string,
        language:       DatabaseLanguage,
        parent:         TabWindow,
    ) {
        super(name, language, parent);
    }

    static generatedQuery(language: DatabaseLanguage, parent: TabWindow): UserQueryTab {
        const userQueryTab = new UserQueryTab("AI Query", language, parent)
        userQueryTab.loaded = false;
        return userQueryTab;
    }

    // only used when an AI Query is generated using the query in NewTabs
    override async load() {
        try {
            // this definitely has concurrency bugs trying to use a regular
            // variable (self.loaded) as a lock
            if (!this.loaded && !this.loading) {
                this.loading = true;

                const language = this.language;
                const result = await Chatbot.sampleQuery(language);

                this.query = result
                this.loaded = true;
                this.loading = false;

                // update UI if needed
                const editor = this.editor();
                if (editor) {
                    editor.setValue(result)
                    await this.updateToolbar();
                    await this.updateCode();
                }
            }
        }
        catch (error) {
            this.loading = false;
            throw error
        }
    }

    createTranslationTab(language: DatabaseLanguage): TranslatedQueryTab {
        const translationTab = new TranslatedQueryTab("Translation", language, this.parent, this);
        this.translations[language] = translationTab;
        translationTab.load();
        return translationTab;
    }

    async translate(language: DatabaseLanguage) {
        // if translation already exists, don't make a new one
        const existingTranslation = this.translations[language];
        if (existingTranslation !== undefined) {
            await existingTranslation.select();
            return;
        }

        // otherwise create translation
        let sibling = this.parent.sibling("horizontal", "after");
        if (!(sibling instanceof TabWindow)) {
            sibling = await this.parent.addSibling("horizontal", "after", true);
            (sibling as TabWindow).contents = []
        }
        const window = (sibling as TabWindow);
        const tab = this.createTranslationTab(language);
        await window.addTab(tab, true);
    }
}

export default UserQueryTab