import '../styles/TranslatorMockup.css'
import '../styles/Gutters.css'

import Navbar from '../components/Navbar.tsx'
import React from "react";
import WindowContainer from "../components/WindowComponents/WindowContainer.tsx";
import TabWindow from "../components/WindowComponents/Windows/TabWindow/TabWindow.tsx";
import WindowGroup from "../components/WindowComponents/Windows/WindowGroup/WindowGroup.tsx";
import UserQueryTab from "../components/WindowComponents/Tabs/QueryTab/UserQueryTab.tsx";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import {DragDropContext} from "@hello-pangea/dnd";


const TranslatorMockup: React.FC = () => {
    const root = new WindowGroup(null, "horizontal")

    const tabWindow1 = new TabWindow(root);
    const tab = new UserQueryTab("Query Tab", "PL/pgSQL", tabWindow1);
    tabWindow1.contents = [tab];
    tabWindow1.selected = tab;

    const tabWindow2 = new TabWindow(root);

    root.children = [tabWindow1, tabWindow2]

    function getWindow(id: string): TabWindow | null {
        function getWindowFrom(from: WindowGroup, id: string): TabWindow | null {
            for (const tabObject of from.children) {
                if (tabObject instanceof WindowGroup) {
                    const result = getWindowFrom(tabObject, id);
                    if (result) {
                        return result;
                    }
                }
                else if (tabObject instanceof TabWindow && tabObject.id == id) {
                    return tabObject
                }
            }
            return null;
        }

        return getWindowFrom(root, id);
    }

    function onDragEnd(result: any): void { // eslint-disable-line
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        const sourceWindow = getWindow(source.droppableId);
        const destinationWindow = getWindow(destination.droppableId);

        if (sourceWindow === null) {
            console.log("could not find source window");
            return;
        }
        if (destinationWindow === null) {
            console.log("could not find destination window");
            return;
        }

        // move window
        const [removed] = sourceWindow.contents.splice(source.index, 1);
        if (source.droppableId === destination.droppableId) {
            sourceWindow.contents.splice(destination.index, 0, removed);
        } else {
            // remove from old window
            const selected = sourceWindow.selected === removed;
            if (sourceWindow.contents.length === 0) {
                sourceWindow.deleteSelf();
            }
            else if (selected) {
                sourceWindow.selected = sourceWindow.contents[Math.max(0, source.index - 1)];
                sourceWindow.forceUpdate()
            }

            // add to new window
            destinationWindow.contents.splice(destination.index, 0, removed);
            removed.parent = destinationWindow;
            if (selected) {
                removed.select()
            }
        }
    }

    return (
        <div className='translator-page'>
            <Navbar/>

            <PanelGroup
                className="page-content"
                direction={"horizontal"}
            >
                <Panel
                    defaultSize={20}
                >
                    <div className='sidebar'>
                        sidebar
                    </div>
                </Panel>

                <PanelResizeHandle className={"gutter gutter-horizontal"}/>

                <Panel>
                    <PanelGroup
                        className="code-content"
                        direction={"vertical"}
                    >
                        <Panel
                            defaultSize={70}
                        >
                            <div className={"tab-container"}>
                                <DragDropContext onDragEnd={onDragEnd}>
                                    <WindowContainer
                                        self={root}
                                    />
                                </DragDropContext>
                            </div>
                        </Panel>

                        <PanelResizeHandle className={"gutter gutter-vertical"}/>

                        <Panel>
                            <div className='console'>
                                console
                            </div>
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </div>
    );
}

export default TranslatorMockup;
