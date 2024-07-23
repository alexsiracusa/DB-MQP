import Tab from "../Tab.tsx";
import TabWindow from "../../Windows/TabWindow/TabWindow.tsx";
import TranslationController from "../QueryTab/TranslationController.tsx";
import {DatabaseLanguage} from "../../../../DatabaseLanguage.tsx";

class ExplanationTab extends Tab {
    language: DatabaseLanguage;
    controller: TranslationController;
    explanation: string = "";

    loaded(): boolean { return this.controller.translations[this.language].loaded; }
    loading(): boolean { return this.controller.translations[this.language].loading; }

    tabPath(): Tab[] {
        return [this.controller.original, this.controller.translationTab, this]
    }

    constructor(
        name: string,
        language: DatabaseLanguage,
        parent: TabWindow,
        controller: TranslationController,
    ) {
        super(name, parent);
        this.language = language;
        this.controller = controller;
    }

    async load() {
        await this.controller.load(this.language);
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
    ): Promise<void> {
        await super.delete(update);
        if (primary) {
            await this.controller.translationTab.delete(update, false);
            this.controller.original.translationController = undefined;
        }
    }
}

export default ExplanationTab;