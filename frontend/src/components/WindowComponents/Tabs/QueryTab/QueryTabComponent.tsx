import '../../../../styles/TabContent.css'

import QueryTab from "./QueryTab.tsx";
import QueryTabToolbar from "./QueryTabToolbar.tsx";
import QueryTabCode from "./QueryTabCode.tsx";
import React from "react";


type QueryTabComponentProps = {
    self: QueryTab
}

const QueryTabComponent = (props: QueryTabComponentProps) => {
    const self = props.self;

    React.useEffect(() => {
        // useEffect will run twice in StrictMode which is dumb, but no good solutions
        // seem to exist anymore. See StackOverflow post below
        // https://stackoverflow.com/questions/72238175/why-useeffect-running-twice-and-how-to-handle-it-well-in-react
        (async () => {
            await self.load();
        })();
    });

    return (
        <div className="tab-content-container">
            <QueryTabToolbar self={self}/>
            <QueryTabCode self={self}/>
        </div>
    )
}

export default QueryTabComponent;