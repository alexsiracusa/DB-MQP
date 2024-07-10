import '../../../../styles/QueryTabToolbar.css'

import QueryTab from "./QueryTab.tsx";
import RunButton from "./Buttons/RunButton.tsx";
import TranslateButton from "./Buttons/TranslateButton.tsx";
import LanguageButton from "./Buttons/LanguageButton.tsx";
import LockButton from "./Buttons/LockButton.tsx";
import UserQueryTab from "./UserQueryTab.tsx";

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
                { (self instanceof UserQueryTab) &&
                    <TranslateButton self={self}/>
                }
                <LanguageButton self={self}/>
                <LockButton self={self}/>
            </div>
        </div>
    )
}

export default QueryTabToolbar;