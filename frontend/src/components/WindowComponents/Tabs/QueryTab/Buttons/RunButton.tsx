import '../../../../../styles/QueryTabToolbar.css'

import QueryTab from "../QueryTab.tsx";
import TriangleRight from "../../../../../assets/Icons/TriangleRight.svg";

type RunButtonProps = {
    self: QueryTab
}

const RunButton = (props: RunButtonProps) => {
    const self = props.self;

    return (
        <div className="run-button toolbar-button">
            <button
                onClick={() => {
                    console.log(self.id)
                }}
            >
                <img src={TriangleRight}/>
                <p>Run</p>
            </button>
        </div>
    )
}

export default RunButton;