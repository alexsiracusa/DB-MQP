import TabContent from "../TabContent.tsx";
import TabWindow from "../../TabObject/TabWindow/TabWindow.tsx";

export type FileType = "pgSQL" | "MongoDB";

abstract class QueryTab extends TabContent {
    fileType: FileType = "pgSQL"
    locked: boolean = false;
    query: string;

    updateCode: () => void;

    protected constructor(
        name: string,
        fileType: FileType,
        parent: TabWindow,
        forceUpdate: () => void = () => {},
        updateCode: () => void = () => {},
    ) {
        super(name, parent, forceUpdate);
        this.fileType = fileType;
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