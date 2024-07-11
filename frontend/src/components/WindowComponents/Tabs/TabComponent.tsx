import Tab from "./Tab.tsx";
import NewTab from "./NewTab/NewTab.tsx";
import UserQueryTab from "./QueryTab/UserQueryTab/UserQueryTab.tsx";
import TranslatedQueryTab from "./QueryTab/TranslatedQueryTab/TranslatedQueryTab.tsx";
import NewTabComponent from "./NewTab/NewTabComponent.tsx";
import UserQueryTabComponent from "./QueryTab/UserQueryTab/UserQueryTabComponent.tsx";
import TranslatedQueryTabComponent from "./QueryTab/TranslatedQueryTab/TranslatedQueryTabComponent.tsx";
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
    } else if (self instanceof UserQueryTab) {
        return <UserQueryTabComponent self={self}/>
    } else if (self instanceof TranslatedQueryTab) {
        return <TranslatedQueryTabComponent self={self}/>
    }
}

export default TabComponent;