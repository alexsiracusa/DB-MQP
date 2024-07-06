import "../../../../../styles/TabButton.css"

import TabContent from "../../../TabContent/TabContent.tsx";
import XButton from "../../../../../assets/Icons/XButton.svg";
import {Draggable} from "@hello-pangea/dnd";


type TabButtonProps = {
    self: TabContent;
    index: number;
}

const TabButton = (props: TabButtonProps) => {
    const self = props.self;

    function isSelected(): boolean {
        return self.parent.selected == self;
    }

    return (
        <Draggable
            draggableId={self.id}
            disableInteractiveElementBlocking={true}
            index={props.index}
        >
            {(provided) => (
                <div
                    className="draggable-container"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div
                        className="tab-button-container"
                        style={{backgroundColor: isSelected() ? "#ffffff" : "#F6F6F6"}}
                    >
                        <button
                            className="tab-name"
                            onClick={() => {
                                self.select();
                            }}
                        >
                            <p>{self.name}</p>
                        </button>

                        <button
                            className="x-button"
                            title="Delete"
                            onClick={() => {
                                self.delete();
                            }}
                        >
                            <img src={XButton}/>
                        </button>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default TabButton;