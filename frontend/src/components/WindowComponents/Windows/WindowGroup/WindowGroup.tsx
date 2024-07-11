import Window from "../Window.tsx";
import {Direction} from "../../WindowContainer.tsx";

export default class WindowGroup extends Window {
    public children: Window[];
    direction: Direction;

    constructor(
        parent: WindowGroup | null,
        direction: Direction,
        forceUpdate: () => void = () => {}
    ) {
        super(parent, forceUpdate);
        this.children = [];
        this.direction = direction;
    }

    flattenSelf() {
        if (this.parent == null) {
            console.log("cannot flatten root")
            return;
        }

        console.log("flattening " + this.id + " into " + this.parent.id)

        const index = this.parent.children.indexOf(this);
        this.parent.children.splice(index, 1);

        for (const child of this.children.reverse()) {
            this.parent.children.splice(index, 0, child);
            child.parent = this.parent;
            console.log("add child " + child.id);
        }

        this.parent.forceUpdate()
    }
}