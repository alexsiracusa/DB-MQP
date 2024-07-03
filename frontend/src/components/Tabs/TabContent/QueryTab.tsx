import TabContent from "./TabContent.tsx";
import TabWindow from "../TabObject/TabWindow.tsx";

class QueryTab extends TabContent {

    constructor(name: string, parent: TabWindow) {
        super(name, parent);
    }

}

export default QueryTab;