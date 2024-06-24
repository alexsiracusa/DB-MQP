import TabObject from "./TabObject.tsx";
import {Direction} from "./TabMockup.tsx";

export default class TabWindowGroup extends TabObject {
    children: TabObject[]
    direction: Direction

    constructor(direction: "horizontal" | "vertical" | undefined) {
        super();
        this.children = []
        this.direction = direction
    }
}