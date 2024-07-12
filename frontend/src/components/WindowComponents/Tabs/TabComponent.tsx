import Tab from "./Tab.tsx";
import NewTab from "./NewTab/NewTab.tsx";
import QueryTab from "./QueryTab/QueryTab.tsx";
import NewTabComponent from "./NewTab/NewTabComponent.tsx";
import QueryTabComponent from "./QueryTab/QueryTabComponent.tsx";
import useStateCallback from "../../../useStateCallback.tsx";

type TabContentComponentProps = {
    self: Tab
}

const TabComponent = (props: TabContentComponentProps) => {
    const [, updateState] = useStateCallback({});
    function forceUpdate(): Promise<void> {
        return new Promise((resolve) => {
            updateState({}, () => {
                resolve()
            })
        })
    }

    const self = props.self;

    // update entire tab content
    self.forceUpdate = forceUpdate

    if (self instanceof NewTab) {
        return <NewTabComponent self={self}/>
    } else if (self instanceof QueryTab) {
        return <QueryTabComponent self={self}/>
    }
}

export default TabComponent;