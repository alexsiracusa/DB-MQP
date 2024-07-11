import '../../../../../styles/TabContent.css'

import UserQueryTab from "./UserQueryTab.tsx";
import QueryTabToolbar from "../QueryTabToolbar.tsx";
import QueryTabCode from "../QueryTabCode.tsx";

type UserQueryTabComponentProps = {
    self: UserQueryTab
}

const UserQueryTabComponent = (props: UserQueryTabComponentProps) => {
    const self = props.self;

    return (
        <div className="tab-content-container">
            <QueryTabToolbar self={self}/>
            <QueryTabCode self={self}/>
        </div>
    )
}

export default UserQueryTabComponent;