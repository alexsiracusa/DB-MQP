import '../../../styles/TabContent.css'

import NewTab from "./NewTab.tsx";

type QueryTabComponentProps = {
    self: NewTab
}

const QueryTabComponent = (props: QueryTabComponentProps) => {
    const self = props.self;

    return (
        <div className="tab-content-container">
            <div className="tab-toolbar">

            </div>

            <div className="tab-content">
                {self.name}
            </div>
        </div>
    )
}

export default QueryTabComponent;