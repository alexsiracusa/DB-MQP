import '../../../../../styles/TabToolbar.css'

import QueryTab from "../QueryTab.tsx";
import Locked from "../../../../../assets/Icons/Locked.svg";
import Unlocked from "../../../../../assets/Icons/Unlocked.svg";
import {useState} from "react";

type LockButtonProps = {
    self: QueryTab
}

const LockButton = (props: LockButtonProps) => {
    const [locked, setLocked] = useState(props.self.locked)

    return (
        <button
            className="lock-button toolbar-button"
            title={locked ? "Locked" : "Unlocked"}
            onClick={() => {
                setLocked(!locked)
            }}
        >
            {
                locked ? <img src={Locked}/> : <img src={Unlocked}/>
            }
        </button>
    )
}

export default LockButton;