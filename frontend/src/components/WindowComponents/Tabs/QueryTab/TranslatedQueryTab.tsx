import {DatabaseLanguage} from "../../../../DatabaseLanguage.tsx";
import QueryTab from "./QueryTab.tsx";
import TabWindow from "../../Windows/TabWindow/TabWindow.tsx";
import TranslationController from "./TranslationController.tsx";
import Tab from "../Tab.tsx";

class TranslatedQueryTab extends QueryTab {
    controller: TranslationController;

    override isLoaded(): boolean {
        return this.controller.translations[this.language].loaded;
    }

    override isLoading(): boolean {
        return this.controller.translations[this.language].loading;
    }

    override tabPath(): Tab[] {
        return [this.controller.original, this]
    }

    constructor(
        name: string,
        language: DatabaseLanguage,
        parent: TabWindow,
        controller: TranslationController,
    ) {
        super(name, language, parent);
        this.controller = controller;
        this.locked = true;
    }

    override async load() {
        await this.controller.load(this.language);
    }

    async refresh() {
        await this.controller.refresh(this.language)
    }

    async setLanguage(language: DatabaseLanguage) {
        // check if no change
        if (this.language === language) {
            return;
        }

        this.language = language;
        await this.updateToolbar();

        // load if needed
        if (!this.isLoaded()) {
            this.query = "";
            this.setEditorValue("");
            this.controller.explanationTab.explanation = "";

            // set loading UI
            await this.updateCode();
            await this.controller.explanationTab.forceUpdate();

            await this.load();
        }

        // set values
        this.query = this.controller.translations[this.language].translation;
        this.controller.explanationTab.explanation = this.controller.translations[this.language].explanation;

        // update UI
        this.setEditorValue(this.query);
        await this.updateToolbar();
        await this.updateCode();
        await this.controller.explanationTab.forceUpdate();
    }

    override async select(
        update: boolean = true,
        primary: boolean = true
    ): Promise<void> {
        if (primary) {
            await this.controller.select();
        }
        await super.select(update);
    }

    override async delete(
        update: boolean = true,
        primary: boolean = true
    ) {
        await super.delete(update);
        if (primary) {
            await this.controller.explanationTab.delete(update, false);
            this.controller.original.translationController = undefined;
        }
    }

}

export default TranslatedQueryTab