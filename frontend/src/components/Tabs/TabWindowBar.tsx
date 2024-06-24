import {TabWindow} from "./TabMockup.tsx";
import {Direction, Position} from "./TabMockup.tsx";

type TabWindowBarProps = {
    self: TabWindow;
    addSibling: (self: TabWindow, direction: Direction, position: Position) => void;
    deleteSelf: (self: TabWindow) => void;
}

const TabWindowBar = (props: TabWindowBarProps) => {

    return (
        <div>
            <button
                onClick={() => {
                    props.addSibling(props.self, "horizontal", "before")
                }}
            >
                Add Horizontal
            </button>
            <button
                onClick={() => {
                    props.addSibling(props.self, "vertical", "before")
                }}
            >
                Add Vertical
            </button>
            <button
                onClick={() => {
                    props.deleteSelf(props.self);
                }}
            >
                Delete
            </button>
            {props.self.id}
        </div>
    )
}

export default TabWindowBar