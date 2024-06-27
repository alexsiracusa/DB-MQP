import '../styles/TranslatorMockup.css'
import '../styles/Gutters.css'

import Navbar from '../components/Navbar.tsx'
import React from "react";
import TabContainer from "../components/Tabs/TabContainer.tsx";
import TabWindow from "../components/Tabs/TabObject/TabWindow.tsx";
import TabWindowGroup from "../components/Tabs/TabObject/TabWindowGroup.tsx";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";


const TranslatorMockup: React.FC = () => {

    const tabGroup1 = new TabWindowGroup(null, "horizontal")
    const tabGroup2 = new TabWindowGroup(tabGroup1, "vertical");

    const tabWindow1 = new TabWindow(tabGroup1);
    const tabWindow2 = new TabWindow(tabGroup2);
    const tabWindow3 = new TabWindow(tabGroup2);
    const tabWindow4 = new TabWindow(tabGroup2);

    tabGroup2.children = [tabWindow2, tabWindow3, tabWindow4]
    tabGroup1.children = [tabWindow1, tabGroup2]

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
                                <TabContainer
                                    self={tabGroup1}
                                />
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
