import '../../../../styles/TabContent.css'
import '../../../../styles/NewTab.css'

import NewTab from "./NewTab.tsx";
import NewQueryButton from "./Buttons/NewQueryButton.tsx";
import GenerateQueryButton from "./Buttons/GenerateQueryButton.tsx";

type NewTabComponentProps = {
    self: NewTab
}

const TabWindowComponent = (props: NewTabComponentProps) => {
    const self = props.self;

    return (
        <div className="tab-content new-tab-content">
            <NewQueryButton self={self}/>
            <GenerateQueryButton self={self}/>
        </div>
    )
}

export default TabWindowComponent;