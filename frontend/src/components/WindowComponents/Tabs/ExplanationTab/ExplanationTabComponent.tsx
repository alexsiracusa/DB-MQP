import '../../../../styles/TabContent.css'
import '../../../../styles/QueryTabToolbar.css'
import '../../../../styles/ExplanationTab.css'

import ExplanationTab from "./ExplanationTab.tsx";
import React from "react";
import TabFilePathComponent from "../TabFilePathComponent.tsx";


type ExplanationTabComponentProps = {
    self: ExplanationTab
}

const ExplanationTabComponent = (props: ExplanationTabComponentProps) => {
    const self = props.self;

    React.useEffect(() => {
        // useEffect will run twice in StrictMode which is dumb, but no good solutions
        // seem to exist anymore. See StackOverflow post below
        // https://stackoverflow.com/questions/72238175/why-useeffect-running-twice-and-how-to-handle-it-well-in-react
        (async () => {
            try {
                await self.load();
            }
            catch (error) {
                console.log(error)
            }
        })();
    });

    return (
        <div className="tab-content-container">
            <div className="tab-toolbar">
                <div className="file-path">
                    <TabFilePathComponent
                        parentWindow={self.parent}
                        path={self.tabPath()}
                    />
                </div>
                <div className="buttons"/>
            </div>
            <div className="explanation">
                {self.explanation}
            </div>
        </div>
    )
}

export default ExplanationTabComponent;