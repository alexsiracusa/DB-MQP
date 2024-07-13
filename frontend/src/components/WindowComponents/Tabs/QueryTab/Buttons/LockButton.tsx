import '../../../../../styles/QueryTabToolbar.css'

import QueryTab from "../QueryTab.tsx";
import Locked from "../../../../../assets/Icons/Locked.svg";
import Unlocked from "../../../../../assets/Icons/Unlocked.svg";
import {useState} from "react";
import TranslatedQueryTab from "../TranslatedQueryTab.tsx";

type LockButtonProps = {
    self: QueryTab
}

const LockButton = (props: LockButtonProps) => {
    const self = props.self;
    const [locked, setLocked] = useState(self.locked)

    // needed when moving tabs between windows because react reuses
    // states on the same level in the DOM tree
    if (locked != self.locked) {
        setLocked(self.locked)
    }

    async function toggle() {
        const newValue = !locked;
        setLocked(newValue);
        self.locked = newValue;
        await self.updateCode();
    }

    function disabled(): boolean {
        return (
            !self.isLoaded() ||
            (self instanceof TranslatedQueryTab)
        );
    }

    return (
        <button
            className="lock-button toolbar-button"
            title={locked ? "Locked" : "Unlocked"}
            onClick={toggle}
            disabled={disabled()}
        >
            {
                locked ? <img src={Locked}/> : <img src={Unlocked}/>
            }
        </button>
    )
}

export default LockButton;