import "../../../../styles/TabWindowBar.css"

import TabWindow from "./TabWindow.tsx";
import MenuButton from "./Buttons/MenuButton.tsx"
import TabButton from "./Buttons/TabButton.tsx";
import PlusButton from "./Buttons/PlusButton.tsx";
import {Droppable} from "@hello-pangea/dnd";
import HelpButton from "../../../HelpButton.tsx";

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
                    <MenuButton self={self}/>
                    <HelpButton/>
                </div>

            </div>
        </div>
    )
}

export default TabWindowBar