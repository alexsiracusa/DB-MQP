import '../../../../../styles/QueryTabToolbar.css'

import QueryTab from "../QueryTab.tsx";
import RunIcon from "../../../../../assets/Icons/RunIcon.svg"
import { useContext } from 'react';
import {ConsoleContext} from "../../../../../pages/TranslatorPage.tsx";

type RunButtonProps = {
    self: QueryTab
}

const RunButton = (props: RunButtonProps) => {
    const self = props.self;
    const queryConsole = useContext(ConsoleContext)

    function disabled(): boolean {
        return !self.isLoaded();
    }

    return (
        <button
            className="run-button toolbar-button"
            title="Run"
            disabled={disabled()}
            onClick={() => {
                queryConsole.append(self.id.slice(0, 6))
                console.log(self.id)
            }}
        >
            <img src={RunIcon}/>
        </button>
    )
}

export default RunButton;