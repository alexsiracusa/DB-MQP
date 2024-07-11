import {v4 as uuid} from 'uuid';
import WindowGroup from "./WindowGroup/WindowGroup.tsx";

abstract class Window {
    id: string = uuid();
    parent: WindowGroup | null;
    forceUpdate: () => void;

    protected constructor(
        parent: WindowGroup | null,
        forceUpdate: () => void,
    ) {
        this.parent = parent;
        this.forceUpdate = forceUpdate;
    }

}

export default Window;