import {DatabaseLanguage} from "../../../../DatabaseLanguage.tsx";
import QueryTab from "./QueryTab.tsx";
import TabWindow from "../../Windows/TabWindow/TabWindow.tsx";
import UserQueryTab from "./UserQueryTab.tsx";
import Chatbot from "../../../../api/ChatbotInstance.ts";

class TranslatedQueryTab extends QueryTab {
    original: UserQueryTab

    constructor(
        name: string,
        language: DatabaseLanguage,
        parent: TabWindow,
        original: UserQueryTab,
    ) {
        super(name, language, parent);
        this.original = original;
        this.locked = true;
        this.loaded = false;
        // it is not locked and loaded unfortunately :(
    }

    override async load() {
        try {
            // this definitely has concurrency bugs trying to use a regular
            // variable (self.loaded) as a lock
            if (!this.loaded) {
                this.loaded = true;

                const inputCode = this.original.query;
                const inputLang = this.original.language;
                const outputLang = this.language;
                const result = await Chatbot.translate(inputCode, inputLang, outputLang);

                this.query = result.code;

                // update UI if needed
                const editor = this.editor();
                if (editor) {
                    editor.setValue(result.code);
                }
                await this.updateToolbar();
                await this.updateCode();
            }
        } catch (error) {
            this.loaded = false;
            throw error;
        }
    }

    override async delete(
        update: boolean = true
    ) {
        await super.delete(update)
        delete this.original.translations[this.language]
    }

}

export default TranslatedQueryTab