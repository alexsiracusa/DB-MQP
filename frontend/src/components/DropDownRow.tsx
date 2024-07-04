import '../styles/Dropdown.css'

import {Children, PropsWithChildren} from "react";

type DropdownRowProps = {
    value: string
}

const DropdownRow = (props: PropsWithChildren<DropdownRowProps>) => {
    return (
        <div className="row">
            {Children.map(props.children, child =>
                <>
                    {child}
                </>
            )}
        </div>
    )
}

export default DropdownRow;