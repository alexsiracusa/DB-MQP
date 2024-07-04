import '../../../../styles/TabDropdown.css'

import TabWindow from "../TabWindow.tsx";
import MenuIcon from "../../../../assets/Icons/MenuIcon.svg";
import PaneRight from "../../../../assets/Icons/PaneRight.svg";
import PaneLeft from "../../../../assets/Icons/PaneLeft.svg";
import PaneUp from "../../../../assets/Icons/PaneUp.svg";
import PaneDown from "../../../../assets/Icons/PaneDown.svg";
import Dropdown from "../../../Dropdown.tsx";
import DropDownRow from "../../../DropDownRow.tsx";


type TabDropdownProps = {
    self: TabWindow;
}

const TabDropdown = (props: TabDropdownProps) => {

    function setValue(newValue: string) {
        switch (newValue) {
            case "pane-right": {
                props.self.addSibling("horizontal", "after")
                break;
            }
            case "pane-left": {
                props.self.addSibling("horizontal", "before")
                break;
            }
            case "pane-up": {
                props.self.addSibling("vertical", "before")
                break;
            }
            case "pane-down": {
                props.self.addSibling("vertical", "after")
                break;
            }
            case "delete": {
                props.self.deleteSelf()
                break;
            }
        }
    }

    return (
        <div className="tab-dropdown">
            <Dropdown
                icon={
                    <div className="tab-dropdown-icon">
                        <img src={MenuIcon}/>
                    </div>
                }
                onChange={setValue}
            >
                <DropDownRow value={"pane-right"}>
                    <img src={PaneRight}/>
                    <p>Insert Right</p>
                </DropDownRow>

                <DropDownRow value={"pane-left"}>
                    <img src={PaneLeft}/>
                    <p>Insert Left</p>
                </DropDownRow>

                <DropDownRow value={"pane-up"}>
                    <img src={PaneUp}/>
                    <p>Insert Up</p>
                </DropDownRow>

                <DropDownRow value={"pane-down"}>
                    <img src={PaneDown}/>
                    <p>Insert Down</p>
                </DropDownRow>

                <DropDownRow value={"delete"}>
                    <p>Delete</p>
                </DropDownRow>
            </Dropdown>
        </div>
    )
}

export default TabDropdown;