import '../../../styles/TabContent.css'

import NewTab from "./NewTab.tsx";

type NewTabComponentProps = {
    self: NewTab
}

const TabWindowComponent = (props: NewTabComponentProps) => {
    const self = props.self;

    return (
        <div className="tab-content">
            {self.name}
        </div>
    )
}

export default TabWindowComponent;