import TabObject from "./TabObject.tsx";
import TabContent from "./TabContent.tsx";

export default class TabWindow extends TabObject {
    contents: TabContent[]

    constructor() {
        super();
        this.contents = []
    }
}