import TabObject from "./TabObject.tsx";
import {Direction} from "./TabMockup.tsx";

export default class TabWindowGroup extends TabObject {
    children: TabObject[]
    direction: Direction

    constructor(direction: Direction) {
        super();
        this.children = []
        this.direction = direction
    }
}