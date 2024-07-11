import '../../../../../styles/QueryTabToolbar.css'

import QueryTab from "../QueryTab.tsx";
import RunIcon from "../../../../../assets/Icons/RunIcon.svg"

type RunButtonProps = {
    self: QueryTab
}

const RunButton = (props: RunButtonProps) => {
    const self = props.self;

    return (
        <button className="run-button toolbar-button"
                onClick={() => {
                    console.log(self.id)
                }}
        >
            <img src={RunIcon}/>
        </button>
    )
}

export default RunButton;