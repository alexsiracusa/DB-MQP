import Tab from "../Tab.tsx";
import TabWindow from "../../Windows/TabWindow/TabWindow.tsx";
import TranslationController from "../QueryTab/TranslationController.tsx";

class ExplanationTab extends Tab {
    controller: TranslationController
    explanation: string = "";
    deleted: boolean = false;

    loaded() {
        return this.controller.loaded
    }

    loading() {
        return this.controller.loading
    }

    constructor(
        name: string,
        parent: TabWindow,
        controller: TranslationController,
    ) {
        super(name, parent);
        this.controller = controller;
    }

    async load() {
        await this.controller.load();
    }

    override async delete(update: boolean = true): Promise<void> {
        this.deleted = true;
        await super.delete(update);
    }
}

export default ExplanationTab;