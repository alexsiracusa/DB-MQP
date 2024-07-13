import {DatabaseLanguage} from "../../../../DatabaseLanguage.tsx";
import QueryTab from "./QueryTab.tsx";
import TabWindow from "../../Windows/TabWindow/TabWindow.tsx";
import TranslationController from "./TranslationController.tsx";

class TranslatedQueryTab extends QueryTab {
    controller: TranslationController;
    deleted: boolean = false;

    override isLoaded(): boolean {return this.controller.loaded}

    override isLoading(): boolean {return this.controller.loading}

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
        this.deleted = true;
        await super.delete(update)
        await this.controller.delete(update)
    }

}

export default TranslatedQueryTab