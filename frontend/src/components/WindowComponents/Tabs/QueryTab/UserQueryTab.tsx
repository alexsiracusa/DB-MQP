import {DatabaseLanguage} from "../../../../DatabaseLanguage.tsx";
import Tab from "../Tab.tsx";
import QueryTab from "./QueryTab.tsx";
import TabWindow from "../../Windows/TabWindow/TabWindow.tsx";
import Chatbot from "../../../../api/ChatbotInstance.ts";
import TranslationController from "./TranslationController.tsx";

class UserQueryTab extends QueryTab {
    translationController: TranslationController | undefined = undefined;

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

    async translate(language: DatabaseLanguage) {
        if (!this.translationController) {
            this.translationController = await TranslationController.create(this, language);
        }
        else {
            await this.translationController.setLanguage(language);
        }
    }

    override async select(
        update: boolean = true,
        primary: boolean = true
    ): Promise<void> {
        if (primary) {
            await this.translationController?.select();
        }
        await super.select(update);
    }

    override async delete(update: boolean = true): Promise<void> {
        await super.delete(update);
        await this.translationController?.explanationTab.delete();
    }
}

export default UserQueryTab