import '../../../../styles/TabToolbar.css'

import QueryTab from "./QueryTab.tsx";

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
            <p>Run</p>
        </button>
    )
}

export default RunButton;