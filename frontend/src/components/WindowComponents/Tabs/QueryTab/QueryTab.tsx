import Tab from "../Tab.tsx";
import TabWindow from "../../TabObject/TabWindow/TabWindow.tsx";
import {DatabaseLanguage} from "../../../../DatabaseLanguage.tsx";

abstract class QueryTab extends Tab {
    language: DatabaseLanguage = "PL/pgSQL"
    locked: boolean = false;
    query: string;

    updateCode: () => void;

    protected constructor(
        name: string,
        language: DatabaseLanguage,
        parent: TabWindow,
        forceUpdate: () => void = () => {},
        updateCode: () => void = () => {},
    ) {
        super(name, parent, forceUpdate);
        this.language = language;
        this.query = "--" + this.id.slice(0,6)
        this.updateCode = updateCode;
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