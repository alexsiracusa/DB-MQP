import '../../../../../styles/MenuButton.css'

import TabWindow from "../TabWindow.tsx";
import MenuIcon from "../../../../../assets/Icons/MenuIcon.svg";
import PaneRight from "../../../../../assets/Icons/PaneRight.svg";
import PaneLeft from "../../../../../assets/Icons/PaneLeft.svg";
import PaneUp from "../../../../../assets/Icons/PaneUp.svg";
import PaneDown from "../../../../../assets/Icons/PaneDown.svg";
import Dropdown from "../../../../Dropdown.tsx";
import DropDownRow from "../../../../DropDownRow.tsx";


type TabDropdownProps = {
    self: TabWindow;
}

const MenuButton = (props: TabDropdownProps) => {
    const self = props.self;

    function setValue(newValue: string) {
        switch (newValue) {
            case "pane-right": {
                self.addSibling("horizontal", "after")
                break;
            }
            case "pane-left": {
                self.addSibling("horizontal", "before")
                break;
            }
            case "pane-up": {
                self.addSibling("vertical", "before")
                break;
            }
            case "pane-down": {
                self.addSibling("vertical", "after")
                break;
            }
            case "delete": {
                self.deleteSelf()
                break;
            }
        }
    }

    return (
        <div className="menu-button">
            <Dropdown
                icon={
                    <img src={MenuIcon}/>
                }
                className="menu-dropdown-button"
                title={"Menu"}
                disabled={false}
                onChange={setValue}
            >
                <DropDownRow value={"pane-right"} className="menu-row">
                    <img src={PaneRight}/>
                    Pane Right
                </DropDownRow>

                <DropDownRow value={"pane-left"} className="menu-row">
                    <img src={PaneLeft}/>
                    Pane Left
                </DropDownRow>

                <DropDownRow value={"pane-up"} className="menu-row">
                    <img src={PaneUp}/>
                    Pane Up
                </DropDownRow>

                <DropDownRow value={"pane-down"} className="menu-row">
                    <img src={PaneDown}/>
                    Pane Down
                </DropDownRow>

                <DropDownRow value={"delete"} className="menu-row">
                    Delete
                </DropDownRow>
            </Dropdown>
        </div>
    )
}

export default MenuButton;