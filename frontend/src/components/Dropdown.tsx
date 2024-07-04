import '../styles/Dropdown.css'

import React, {Children, PropsWithChildren} from "react";
import {useDetectClickOutside} from 'react-detect-click-outside';

type DropdownProps = {
    icon: JSX.Element
    onChange: (arg0: any) => void
}

const Dropdown = (props: PropsWithChildren<DropdownProps>) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const closeDropdown = () => {
        setIsVisible(false);
    }

    const ref = useDetectClickOutside({onTriggered: closeDropdown});

    return (
        <div className="dropdown" ref={ref}>
            <button className="dropdown-button"
                onClick={() => {
                    setIsVisible(!isVisible)
                }}
            >
                {props.icon}
            </button>

            {isVisible && (
                <div className="dropdown-container">
                    <div className="dropdown-content">
                        {Children.map(props.children, child => {
                            if (!React.isValidElement(child)) {
                                return
                            }

                            return (
                                <button
                                    onClick={() => {
                                        props.onChange(child.props.value)
                                        closeDropdown()
                                    }}
                                >
                                    {child}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dropdown;