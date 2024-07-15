import {DatabaseLanguage} from "../../../../DatabaseLanguage.tsx";
import Tab from "../Tab.tsx";
import QueryTab from "./QueryTab.tsx";
import TabWindow from "../../Windows/TabWindow/TabWindow.tsx";
import Chatbot from "../../../../api/ChatbotInstance.ts";
import TranslationController from "./TranslationController.tsx";

class UserQueryTab extends QueryTab {
    translations: Record<DatabaseLanguage, TranslationController> = {} as Record<DatabaseLanguage, TranslationController>;

    loaded: boolean = true;
    loading: boolean = false;

    override isLoaded(): boolean {return this.loaded}
    override isLoading(): boolean {return this.loading}

    override tabPath(): Tab[] {
        return [this]
    }

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

    createTranslation(language: DatabaseLanguage): TranslationController {
        const translationController = new TranslationController(this, language);
        this.translations[language] = translationController;
        translationController.load();
        return translationController;
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
        const translation = this.createTranslation(language);
        await window.addTab(translation.translatedQueryTab, true, true);
        await window.addTab(translation.explanationTab, true, false);
    }
}

export default UserQueryTab