import TabContent from "../TabContent.tsx";
import TabWindow from "../../TabObject/TabWindow.tsx";

type FileType = "pgSQL" | "MongoDB";

class QueryTab extends TabContent {
    fileType: FileType = "pgSQL"

    constructor(name: string, parent: TabWindow) {
        super(name, parent);
    }

}

export default QueryTab;