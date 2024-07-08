import TabContent from "../TabContent.tsx";
import TabWindow from "../../TabObject/TabWindow/TabWindow.tsx";

type FileType = "pgSQL" | "MongoDB";

class QueryTab extends TabContent {
    fileType: FileType = "pgSQL"
    locked: boolean = false;
    query: string;

    updateCode: () => void;

    constructor(
        name: string,
        parent: TabWindow,
        forceUpdate: () => void = () => {},
        updateCode: () => void = () => {},
    ) {
        super(name, parent, forceUpdate);
        this.query = "--" + this.id.slice(0,6)
        this.updateCode = updateCode;
    }

    language() {
        switch (this.fileType) {
            case "pgSQL": {
                return "sql"
            }
            case "MongoDB": {
                return "javascript"
            }
        }
    }

}

export default QueryTab;