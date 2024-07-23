import UserQueryTab from "./UserQueryTab.tsx";
import TranslatedQueryTab from "./TranslatedQueryTab.tsx";
import ExplanationTab from "../ExplanationTab/ExplanationTab.tsx";
import Chatbot from "../../../../api/ChatbotInstance.ts";
import {DatabaseLanguage, databaseLanguages} from "../../../../DatabaseLanguage.tsx";
import TabWindow from "../../Windows/TabWindow/TabWindow.tsx";

type TranslationState = {
    translation: string;
    explanation: string;

    loaded: boolean;
    loading: boolean;
    shouldRefresh: boolean;
}

class TranslationController {
    original: UserQueryTab;
    translationTab: TranslatedQueryTab;
    explanationTab: ExplanationTab;

    translations: Record<DatabaseLanguage, TranslationState> = {} as Record<DatabaseLanguage, TranslationState>;

    private constructor(
        original: UserQueryTab,
    ) {
        this.original = original;
        this.translationTab = new TranslatedQueryTab("undefined", "", original.parent, this);
        this.explanationTab = new ExplanationTab("undefined", "", original.parent, this)

        for (const language of databaseLanguages) {
            this.initializeTranslationState(language);
        }
    }

    static async create(
        original: UserQueryTab,
        initialLanguage: DatabaseLanguage
    ): Promise<TranslationController> {
        const controller = new TranslationController(original);

        const translationWindow = await controller.getSibling(controller.original.parent) as TabWindow;
        const explanationWindow = await controller.getSibling(translationWindow) as TabWindow;

        controller.translationTab = new TranslatedQueryTab("Translation", initialLanguage, translationWindow, controller);
        controller.explanationTab = new ExplanationTab("Explanation", initialLanguage, explanationWindow, controller);

        await translationWindow.addTab(controller.translationTab, true, true);
        await explanationWindow.addTab(controller.explanationTab, true, true);

        controller.load(initialLanguage);

        return controller;
    }

    async select() {
        await this.explanationTab.select(true, false)
        await this.translationTab.select(true, false)
        await this.original.select(true, false)
    }

    // assumes "this.translations" has a record for the given language
    async load(language: DatabaseLanguage) {
        const translationState = this.translations[language];

        try {
            // this definitely has concurrency bugs trying to use a regular
            // variable (self.loaded) as a lock
            if ((!translationState.loaded || translationState.shouldRefresh) && !translationState.loading) {
                translationState.loading = true;

                // get chatbot response
                const inputCode = this.original.query;
                const inputLang = this.original.language;
                const outputLang = language;
                const result = await Chatbot.translate(inputCode, inputLang, outputLang);

                // set values
                translationState.translation = result.code;
                translationState.explanation = result.explanation;

                // set loading to be complete
                translationState.loading = false;
                translationState.shouldRefresh = false;
                translationState.loaded = true;

                // update UI if needed
                if (this.translationTab.language === language) {
                    this.translationTab.query = result.code;
                    this.explanationTab.explanation = result.explanation;

                    try {
                        await this.explanationTab.forceUpdate()
                    } catch (error) { /*console.log(error)*/ }

                    const editor = this.translationTab.editor();
                    if (editor) {
                        editor.setValue(result.code);
                        await this.translationTab.updateToolbar();
                        await this.translationTab.updateCode();
                    }
                }
            }
        } catch (error) {
            translationState.loading = false;
            translationState.shouldRefresh = false;
            throw error;
        }
    }

    async refresh(language: DatabaseLanguage) {
        const translationState = this.translations[language];
        translationState.shouldRefresh = true;
        await this.load(language);
    }

    async setLanguage(language: DatabaseLanguage) {
        await this.translationTab.setLanguage(language);
    }

    private initializeTranslationState(language: DatabaseLanguage) {
        this.translations[language] = {
            translation: "",
            explanation: "",

            loaded: false,
            loading: false,
            shouldRefresh: false
        };
    }

    private async getSibling(from: TabWindow) {
        let sibling = from.sibling("horizontal", "after");
        if (!(sibling instanceof TabWindow)) {
            sibling = await from.addSibling("horizontal", "after", true);
            (sibling as TabWindow).contents = []
        }
        return sibling;
    }
}

export default TranslationController;