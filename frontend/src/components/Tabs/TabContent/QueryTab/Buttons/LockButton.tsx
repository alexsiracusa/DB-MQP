import '../../../../../styles/QueryTabToolbar.css'

import QueryTab from "../QueryTab.tsx";
import Locked from "../../../../../assets/Icons/Locked.svg";
import Unlocked from "../../../../../assets/Icons/Unlocked.svg";
import {useState} from "react";

type LockButtonProps = {
    self: QueryTab
}

const LockButton = (props: LockButtonProps) => {
    const self = props.self;
    const [locked, setLocked] = useState(props.self.locked)

    function toggle() {
        const newValue = !locked;
        setLocked(newValue);
        self.locked = newValue;
        self.forceUpdate();
    }

    return (
        <button
            className="lock-button toolbar-button"
            title={locked ? "Locked" : "Unlocked"}
            onClick={toggle}
        >
            {
                locked ? <img src={Locked}/> : <img src={Unlocked}/>
            }
        </button>
    )
}

export default LockButton;