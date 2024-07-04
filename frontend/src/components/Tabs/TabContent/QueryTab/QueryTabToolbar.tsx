import '../../../../styles/TabToolbar.css'

import QueryTab from "./QueryTab.tsx";
import RunButton from "./RunButton.tsx";
import TranslateButton from "./TranslateButton.tsx";
import FileTypeButton from "./FileTypeButton.tsx";

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
                <TranslateButton self={self}/>
                <FileTypeButton self={self}/>
            </div>
        </div>
    )
}

export default QueryTabToolbar;