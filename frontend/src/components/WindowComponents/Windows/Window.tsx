import {v4 as uuid} from 'uuid';
import WindowGroup from "./WindowGroup/WindowGroup.tsx";

abstract class Window {
    id: string = uuid();
    parent: WindowGroup | null;
    forceUpdate: () => Promise<void>;

    protected constructor(
        parent: WindowGroup | null,
        forceUpdate: () => Promise<void> = () => new Promise(() => {}),
    ) {
        this.parent = parent;
        this.forceUpdate = forceUpdate;
    }

}

export default Window;