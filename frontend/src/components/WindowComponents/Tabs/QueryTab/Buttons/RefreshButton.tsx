import '../../../../../styles/QueryTabToolbar.css'

import TranslatedQueryTab from "../TranslatedQueryTab.tsx";
import Refresh from "../../../../../assets/Icons/Refresh.svg"
import Refreshing from "../../../../../assets/Icons/Refreshing.svg";
import {useState} from "react";

type RefreshButtonProps = {
    self: TranslatedQueryTab
}

const RefreshButton = (props: RefreshButtonProps) => {
    const self = props.self;
    const [refreshing, setRefreshing] = useState(false)

    async function toggle() {
        setRefreshing(true);
        console.log(self.original.query)
        await self.refresh();
        setRefreshing(false);
    }

    function disabled(): boolean {
        return (
            !self.loaded ||
            refreshing
        );
    }

    return (
        <button
            className="refresh-button toolbar-button"
            title="Refresh"
            onClick={toggle}
            disabled={disabled()}
        >
            {
                refreshing ? <img src={Refreshing}/> : <img src={Refresh}/>
            }
        </button>
    )
}

export default RefreshButton;