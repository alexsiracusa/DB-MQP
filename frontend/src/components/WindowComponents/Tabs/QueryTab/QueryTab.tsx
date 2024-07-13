import Tab from "../Tab.tsx";
import TabWindow from "../../Windows/TabWindow/TabWindow.tsx";
import {DatabaseLanguage} from "../../../../DatabaseLanguage.tsx";
import type monaco from "monaco-editor";


abstract class QueryTab extends Tab {
    language: DatabaseLanguage = "PL/pgSQL"
    locked: boolean = false;
    query: string = "";

    loaded: boolean = true;
    loading: boolean = false;

    updateToolbar: () => Promise<void>;
    updateCode: () => Promise<void>;

    protected constructor(
        name:           string,
        language:       DatabaseLanguage,
        parent:         TabWindow,
    ) {
        super(name, parent);
        this.language = language;
        this.updateToolbar = () => new Promise(() => {})
        this.updateCode = () => new Promise(() => {});
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

}

export default QueryTab;