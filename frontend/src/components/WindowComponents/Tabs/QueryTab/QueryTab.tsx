import Tab from "../Tab.tsx";
import TabWindow from "../../Windows/TabWindow/TabWindow.tsx";
import {DatabaseLanguage} from "../../../../DatabaseLanguage.tsx";
import type monaco from "monaco-editor";


abstract class QueryTab extends Tab {
    language: DatabaseLanguage = "PL/pgSQL"
    locked: boolean = false;
    query: string = "";
    deleted: boolean = false;

    updateToolbar: () => Promise<void>;
    updateCode: () => Promise<void>;

    abstract isLoaded(): boolean;
    abstract isLoading(): boolean;

    abstract tabPath(): Tab[];

    protected constructor(
        name:           string,
        language:       DatabaseLanguage,
        parent:         TabWindow,
    ) {
        super(name, parent);
        this.language = language;
        this.updateToolbar = () => new Promise((_resolve, reject) => {
            reject("updateToolbar for " + this.id + " not initialized");
        })
        this.updateCode = () => new Promise((_resolve, reject) => {
            reject("updateCode for " + this.id + " not initialized");
        });
    }

    // can throw errors
    abstract load(): Promise<void>;

    override async select(update: boolean = true) {
        await super.select(update);
        const editor = this.editor();
        if (editor && editor.getValue() !== this.query) {
            editor.setValue(this.query)
        }
    }

    editor(): monaco.editor.IStandaloneCodeEditor | null {
        // only return the editor if it is the selected tab
        return (this.parent.editorOwner === this) ? this.parent.editor : null
    }

    editorLanguage() {
        switch (this.language) {
            case "PL/SQL":
            case "PL/pgSQL": {
                return "sql"
            }
            case "MQL": {
                return "javascript"
            }
            case "MongoDBCommand": {
                return "json"
            }
        }
    }

    override async delete(update: boolean = true): Promise<void> {
        this.deleted = true;
        await super.delete(update);
    }

}

export default QueryTab;