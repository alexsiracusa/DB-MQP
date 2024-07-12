import '../../../../../styles/QueryTabToolbar.css'

import QueryTab from "../QueryTab.tsx";
import RunIcon from "../../../../../assets/Icons/RunIcon.svg"

type RunButtonProps = {
    self: QueryTab
}

const RunButton = (props: RunButtonProps) => {
    const self = props.self;

    function disabled(): boolean {
        return !self.loaded;
    }

    return (
        <button
            className="run-button toolbar-button"
            title="Run"
            disabled={disabled()}
            onClick={() => {
                console.log(self.id)
            }}
        >
            <img src={RunIcon}/>
        </button>
    )
}

export default RunButton;