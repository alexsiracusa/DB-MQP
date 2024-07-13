import Tab from "./Tab.tsx";
import NewTab from "./NewTab/NewTab.tsx";
import QueryTab from "./QueryTab/QueryTab.tsx";
import ExplanationTab from "./ExplanationTab/ExplanationTab.tsx";
import NewTabComponent from "./NewTab/NewTabComponent.tsx";
import QueryTabComponent from "./QueryTab/QueryTabComponent.tsx";
import {useStateCallback, updateState} from "../../../useStateCallback.tsx";
import ExplanationTabComponent from "./ExplanationTab/ExplanationTabComponent.tsx";

type TabContentComponentProps = {
    self: Tab
}

const TabComponent = (props: TabContentComponentProps) => {
    const [, setState] = useStateCallback({});
    const self = props.self;
    self.forceUpdate = updateState(setState);

    if (self instanceof NewTab) {
        return <NewTabComponent self={self}/>
    } else if (self instanceof QueryTab) {
        return <QueryTabComponent self={self}/>
    } else if (self instanceof ExplanationTab) {
        return <ExplanationTabComponent self={self}/>
    }
}

export default TabComponent;