import TabContent from "../TabContent.tsx";
import TabWindow from "../../TabObject/TabWindow/TabWindow.tsx";

type FileType = "pgSQL" | "MongoDB";

class QueryTab extends TabContent {
    fileType: FileType = "pgSQL"
    locked: boolean = false;
    query: string = "--SQL Query"

    updateCode: () => void;

    constructor(
        name: string,
        parent: TabWindow,
        forceUpdate: () => void = () => {},
        updateCode: () => void = () => {},
    ) {
        super(name, parent, forceUpdate);
        this.updateCode = updateCode;
    }

}

export default QueryTab;