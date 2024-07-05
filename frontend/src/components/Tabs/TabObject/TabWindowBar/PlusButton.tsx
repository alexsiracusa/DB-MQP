import "../../../../styles/PlusButton.css"

import TabWindow from "../TabWindow.tsx";
import PlusButtonIcon from "../../../../assets/Icons/PlusButton.svg";


type TabButtonProps = {
    self: TabWindow;
}

const PlusButton = (props: TabButtonProps) => {
    const self = props.self;

    return (
        <div className="plus-button">
            <button
                onClick={() => {
                    self.addTab();
                }}
            >
                <img src={PlusButtonIcon}/>
            </button>
        </div>
    )
}

export default PlusButton;