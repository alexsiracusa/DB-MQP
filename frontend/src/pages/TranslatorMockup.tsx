import '.././styles/TranslatorMockup.css'
import Navbar from '../components/Navbar.tsx'
import React from "react";
import Split from 'react-split'
import TabMockup from "../components/Tabs/TabMockup.tsx";
import {TabWindow, TabWindowGroup} from "../components/Tabs/TabMockup.tsx";

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
            <Split
                className="page-content"
                direction="horizontal"
                gutterAlign="start"
                sizes={[20, 80]}
                minSize={6}
                gutterSize={6}
            >
                <div className='sidebar'>
                    <text>sidebar</text>
                </div>
                <Split
                    className="code-content"
                    direction="vertical"
                    gutterAlign="end"
                    sizes={[70, 30]}
                    minSize={6}
                    gutterSize={6}
                >
                    <div className={"tab-container"}>
                        <TabMockup
                            childObject={tabGroup1}
                            addSibling={() => {}}
                        />
                    </div>

                    <div className='console'>
                        <text>console</text>
                    </div>
                </Split>
            </Split>
        </div>
    );
}

export default TranslatorMockup;
