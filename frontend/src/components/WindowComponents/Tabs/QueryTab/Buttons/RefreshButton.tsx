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

    // needed when moving tabs between windows because react reuses
    // states on the same level in the DOM tree
    if (refreshing != self.controller.shouldRefresh) {
        setRefreshing(self.controller.shouldRefresh)
    }

    async function refresh() {
        setRefreshing(true);
        try {
            await self.refresh();
        }
        catch {
            console.log("failed to refresh");
        }
        setRefreshing(false);
    }

    function disabled(): boolean {
        return (
            !self.isLoaded() ||
            refreshing
        );
    }

    return (
        <button
            className="refresh-button toolbar-button"
            title="Refresh"
            onClick={refresh}
            disabled={disabled()}
        >
            {
                refreshing ? <img src={Refreshing}/> : <img src={Refresh}/>
            }
        </button>
    )
}

export default RefreshButton;