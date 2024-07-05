import '../../../../styles/TabToolbar.css'

import QueryTab from "./QueryTab.tsx";
import RunButton from "./Buttons/RunButton.tsx";
import TranslateButton from "./Buttons/TranslateButton.tsx";
import FileTypeButton from "./Buttons/FileTypeButton.tsx";
import LockButton from "./Buttons/LockButton.tsx";

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
                <LockButton self={self}/>
            </div>
        </div>
    )
}

export default QueryTabToolbar;