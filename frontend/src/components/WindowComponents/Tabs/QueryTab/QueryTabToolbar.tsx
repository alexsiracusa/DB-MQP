import '../../../../styles/QueryTabToolbar.css'
import TranslateArrow from "../../../../assets/Icons/TranslateArrow.svg";

import QueryTab from "./QueryTab.tsx";
import RunButton from "./Buttons/RunButton.tsx";
import RefreshButton from "./Buttons/RefreshButton.tsx";
import TranslateButton from "./Buttons/TranslateButton.tsx";
import LanguageButton from "./Buttons/LanguageButton.tsx";
import LockButton from "./Buttons/LockButton.tsx";
import UserQueryTab from "./UserQueryTab.tsx";
import TranslatedQueryTab from "./TranslatedQueryTab.tsx";
import TabFilePathComponent from "../TabFilePathComponent.tsx";
import {updateState, useStateCallback} from "../../../../useStateCallback.tsx";

type QueryTabToolbarProps = {
    self: QueryTab
}

const QueryTabToolbar = (props: QueryTabToolbarProps) => {
    const [, setState] = useStateCallback({});
    const self = props.self;
    self.updateToolbar = updateState(setState);

    return (
        <div className="tab-toolbar">
            <div className="file-path">
                <TabFilePathComponent
                    parentWindow={self.parent}
                    path={self.tabPath()}
                />
            </div>
            <div className="buttons">
                <RunButton self={self}/>
                {(self instanceof TranslatedQueryTab) &&
                    <RefreshButton self={self}/>
                }
                <LanguageButton self={self}/>

                {(self instanceof UserQueryTab) &&
                    <>
                        <img src={TranslateArrow} className="translate-arrow"/>
                        <TranslateButton self={self}/>
                    </>
            }

            <LockButton self={self}/>
            </div>
        </div>
    )
}

export default QueryTabToolbar;