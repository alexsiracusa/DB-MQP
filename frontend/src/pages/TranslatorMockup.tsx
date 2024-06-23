import '.././styles/TranslatorMockup.css'
import Navbar from '../components/Navbar.tsx'
import React from "react";
import Split from 'react-split'

const TranslatorMockup: React.FC = () => {

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
                        <Split
                            className="tab-split-container"
                            direction="horizontal"
                            gutterAlign="start"
                            sizes={[50, 50]}
                            minSize={6}
                            gutterSize={6}
                        >
                            <div className='tab-content'>
                                <text>tab1</text>
                            </div>
                            <div className='tab-content'>
                                <text>tab2</text>
                            </div>
                        </Split>
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
