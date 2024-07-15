import {DatabaseLanguage} from "../../../../DatabaseLanguage.tsx";
import QueryTab from "./QueryTab.tsx";
import TabWindow from "../../Windows/TabWindow/TabWindow.tsx";
import TranslationController from "./TranslationController.tsx";
import Tab from "../Tab.tsx";

class TranslatedQueryTab extends QueryTab {
    controller: TranslationController;

    override isLoaded(): boolean {return this.controller.loaded}

    override isLoading(): boolean {return this.controller.loading}

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
        await this.controller.load();
    }

    async refresh() {
        await this.controller.refresh()
    }

    override async delete(
        update: boolean = true
    ) {
        await super.delete(update)
        await this.controller.delete(update)
    }

}

export default TranslatedQueryTab