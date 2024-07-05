import {v4 as uuid} from 'uuid';
import TabWindowGroup from "./TabWindowGroup.tsx";

abstract class TabObject {
    id: string = uuid();
    parent: TabWindowGroup | null;
    forceUpdate: () => void;

    protected constructor(
        parent: TabWindowGroup | null,
        forceUpdate: () => void,
    ) {
        this.parent = parent;
        this.forceUpdate = forceUpdate;
    }

}

export default TabObject;