import '.././styles/TranslatorMockup.css'
import Navbar from '../components/Navbar.tsx'
import React from "react";
import TabContainer from "../components/Tabs/TabContainer.tsx";
import TabWindow from "../components/Tabs/TabWindow.tsx";
import TabWindowGroup from "../components/Tabs/TabWindowGroup.tsx";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";


const TranslatorMockup: React.FC = () => {

    const tabGroup1 = new TabWindowGroup("horizontal");
    const tabGroup2 = new TabWindowGroup("vertical");

    const tabWindow1 = new TabWindow();
    const tabWindow2 = new TabWindow();
    const tabWindow3 = new TabWindow();
    const tabWindow4 = new TabWindow();

    tabGroup2.children = [tabWindow2, tabWindow3, tabWindow4]
    tabGroup1.children = [tabWindow1, tabGroup2]

    return (
        <div className='translator-page'>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </head>

            <Navbar/>

            <PanelGroup
                className="page-content"
                direction={"horizontal"}
            >
                <Panel
                    defaultSize={20}
                >
                    <div className='sidebar'>
                        <text>sidebar</text>
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
                                    childObject={tabGroup1}
                                    addSibling={() => {
                                    }}
                                    deleteSelf={() => {
                                    }}
                                    flattenSelf={() => {
                                    }}
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
