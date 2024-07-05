import "../../../../styles/TabWindowBar.css"

import TabWindow from "../TabWindow.tsx";
import TabDropdown from "./TabDropdown.tsx"
import TabButton from "./TabButton.tsx";
import PlusButton from "./PlusButton.tsx";
import {Droppable} from "@hello-pangea/dnd";


type TabWindowBarProps = {
    self: TabWindow;
}

const TabWindowBar = (props: TabWindowBarProps) => {
    const self = props.self;

    return (
        <div className="tab-window-bar">
            <Droppable
                droppableId={self.id}
                direction="horizontal"
            >
                {provided => (
                    <div
                        className="tabs"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {self.contents.map((tab, i) => {
                            return (
                                <TabButton
                                    self={tab}
                                    key={tab.id}
                                    index={i}
                                />
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <div className="buttons">
                <div className="buttons-left">
                    <PlusButton self={self}/>
                </div>

                <div className="buttons-right">
                    <TabDropdown self={self}/>
                </div>
            </div>
        </div>
    )
}

export default TabWindowBar