import '../../../../styles/TabContent.css'

import QueryTab from "./QueryTab.tsx";
import QueryTabToolbar from "./QueryTabToolbar.tsx";

type QueryTabComponentProps = {
    self: QueryTab
}

const QueryTabComponent = (props: QueryTabComponentProps) => {
    const self = props.self;

    return (
        <div className="tab-content-container">
            <QueryTabToolbar self={self}/>

            <div className="tab-content">
                {self.name}
            </div>
        </div>
    )
}

export default QueryTabComponent;