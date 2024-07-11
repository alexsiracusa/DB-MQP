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
    const [locked, setLocked] = useState(self.locked)

    // needed when moving tabs between windows, no idea why
    if (locked != self.locked) {
        setLocked(self.locked)
    }

    async function toggle() {
        const newValue = !locked;
        setLocked(newValue);
        self.locked = newValue;
        await self.updateCode();
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