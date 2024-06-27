import '../../../styles/TabContent.css'

import NewTab from "./NewTab.tsx";

type NewTabComponentProps = {
    self: NewTab
}

const TabWindowComponent = (props: NewTabComponentProps) => {
    const self = props.self;

    return (
        <div className="content">
            {self.name}
        </div>
    )
}

export default TabWindowComponent;