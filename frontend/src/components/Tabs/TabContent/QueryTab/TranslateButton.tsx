import MenuIcon from "../../../../assets/Icons/MenuIcon.svg";
import PaneRight from "../../../../assets/Icons/PaneRight.svg";
import PaneLeft from "../../../../assets/Icons/PaneLeft.svg";
import PaneUp from "../../../../assets/Icons/PaneUp.svg";
import PaneDown from "../../../../assets/Icons/PaneDown.svg";
import QueryTab from "./QueryTab.tsx";
import Dropdown from "../../../Dropdown.tsx";
import DropDownRow from "../../../DropDownRow.tsx";


type TranslateButtonProps = {
    self: QueryTab;
}

const TranslateButton = (props: TranslateButtonProps) => {

    function setValue(newValue: string) {
        console.log(newValue)
    }

    return (
        <div className="translate-button toolbar-button">
            <Dropdown
                icon={
                    <div className="tab-dropdown-icon">
                        <p>Translate</p>
                    </div>
                }
                onChange={setValue}
            >
                <DropDownRow value={"pane-right"}>
                    <img src={PaneRight}/>
                    <p>Insert Right</p>
                </DropDownRow>
            </Dropdown>
        </div>
    )
}

export default TranslateButton;