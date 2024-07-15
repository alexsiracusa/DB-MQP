import UserQueryTab from "./UserQueryTab.tsx";
import TranslatedQueryTab from "./TranslatedQueryTab.tsx";
import ExplanationTab from "../ExplanationTab/ExplanationTab.tsx";
import Chatbot from "../../../../api/ChatbotInstance.ts";
import {DatabaseLanguage} from "../../../../DatabaseLanguage.tsx";

class TranslationController {
    original: UserQueryTab;
    language: DatabaseLanguage;

    loaded: boolean = false;
    loading: boolean = false;
    shouldRefresh: boolean = false;

    translatedQueryTab: TranslatedQueryTab;
    explanationTab: ExplanationTab;

    constructor(
        original: UserQueryTab,
        langauge: DatabaseLanguage,
    ) {
        this.original = original;
        this.language = langauge
        this.translatedQueryTab = new TranslatedQueryTab("Translation", this.language, this.original.parent, this);
        this.explanationTab = new ExplanationTab("Explanation", this.original.parent, this);
    }

    async addExplanationTab(update: boolean) {
        if (this.explanationTab.deleted) {
            this.explanationTab.deleted = false;
            await this.translatedQueryTab.parent.addTab(this.explanationTab, update, false);
        }
    }

    async select() {
        await this.addExplanationTab(false);
        if (this.translatedQueryTab.parent === this.explanationTab.parent) {
            await this.translatedQueryTab.select()
        }
        else {
            await this.translatedQueryTab.select()
            await this.explanationTab.select()
        }
    }

    async load() {
        try {
            // this definitely has concurrency bugs trying to use a regular
            // variable (self.loaded) as a lock
            if ((!this.loaded || this.shouldRefresh) && !this.loading) {
                this.loading = true;

                // add explanationTab if it was deleted
                await this.addExplanationTab(true);

                // get chatbot response
                const inputCode = this.original.query;
                const inputLang = this.original.language;
                const outputLang = this.translatedQueryTab.language;
                const result = await Chatbot.translate(inputCode, inputLang, outputLang);

                // set values
                this.translatedQueryTab.query = result.code;
                this.explanationTab.explanation = result.explanation;

                // set loading to be complete
                this.loading = false;
                this.shouldRefresh = false;
                this.loaded = true;

                // update UI if needed
                try { await this.explanationTab.forceUpdate() }
                catch (error) { /*console.log(error)*/ }

                const editor = this.translatedQueryTab.editor();
                if (editor) {
                    editor.setValue(result.code);
                    await this.translatedQueryTab.updateToolbar();
                    await this.translatedQueryTab.updateCode();
                }
            }
        } catch (error) {
            this.loading = false;
            this.shouldRefresh = false;
            throw error;
        }
    }

    async refresh() {
        this.shouldRefresh = true;
        await this.load()
    }

    async delete(
        update: boolean = true
    ) {
        if (!this.translatedQueryTab.deleted) {
            await this.translatedQueryTab.delete(update);
        }
        if (!this.explanationTab.deleted) {
            await this.explanationTab.delete(update)
        }
        delete this.original.translations[this.language]
    }
}

export default TranslationController;