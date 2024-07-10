import '../../../../styles/TabContent.css'

import QueryTab from "./QueryTab.tsx";
import QueryTabToolbar from "./QueryTabToolbar.tsx";
import QueryTabCode from "./QueryTabCode.tsx";

type QueryTabComponentProps = {
    self: QueryTab
}

const QueryTabComponent = (props: QueryTabComponentProps) => {
    const self = props.self;

    return (
        <div className="tab-content-container">
            <QueryTabToolbar self={self}/>
            <QueryTabCode self={self}/>
        </div>
    )
}

export default QueryTabComponent;