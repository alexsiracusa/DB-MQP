import '../../../../styles/TabToolbar.css'

import QueryTab from "./QueryTab.tsx";
import RunButton from "./RunButton.tsx";

type QueryTabToolbarProps = {
    self: QueryTab
}

const QueryTabToolbar = (props: QueryTabToolbarProps) => {
    const self = props.self;

    return (
        <div className="tab-toolbar">
            <div className="file-path">

            </div>
            <div className="buttons">
                <RunButton self={self}/>
            </div>
        </div>
    )
}

export default QueryTabToolbar;