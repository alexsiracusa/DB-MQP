import TabContent from "../TabContent.tsx";
import TabWindow from "../../TabObject/TabWindow/TabWindow.tsx";

class NewTab extends TabContent {

    constructor(name: string, parent: TabWindow) {
        super(name, parent);
    }

}

export default NewTab;