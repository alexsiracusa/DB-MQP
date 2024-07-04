import {Children, PropsWithChildren} from "react";

type DropdownRowProps = {
    value: string
    className: string
}

const DropdownRow = (props: PropsWithChildren<DropdownRowProps>) => {
    return (
        <div className={props.className}>
            {Children.map(props.children, child =>
                <>
                    {child}
                </>
            )}
        </div>
    )
}

export default DropdownRow;