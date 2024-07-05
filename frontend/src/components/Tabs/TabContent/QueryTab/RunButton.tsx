import '../../../../styles/TabToolbar.css'

import QueryTab from "./QueryTab.tsx";
import TriangleRight from "../../../../assets/Icons/TriangleRight.svg";

type RunButtonProps = {
    self: QueryTab
}

const RunButton = (props: RunButtonProps) => {
    const self = props.self;

    return (
        <button
            className="run-button toolbar-button"
            onClick={() => {
                console.log(self.id)
            }}
        >
            <img src={TriangleRight}/>
            <p>Run</p>
        </button>
    )
}

export default RunButton;