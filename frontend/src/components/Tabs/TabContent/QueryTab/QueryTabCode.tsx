import '../../../../styles/TabContent.css'
import '../../../../styles/QueryTabCode.css'

import QueryTab from "./QueryTab.tsx";

type QueryTabCodeProps = {
    self: QueryTab
}

const QueryTabCode = (props: QueryTabCodeProps) => {
    const self = props.self;

    return (
        <div className="tab-content">
            {self.id}
        </div>
    )
}

export default QueryTabCode;