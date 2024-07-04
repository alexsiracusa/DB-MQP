import '../../../../styles/TabToolbar.css';

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
                    <p>Translate</p>
                }
                className="translate-button-icon"
                onChange={setValue}
            >
                <DropDownRow value={"pgSQL"} className="row">
                    <p>pgSQL</p>
                </DropDownRow>

                <DropDownRow value={"MongoDB"} className="row">
                    <p>MongoDB</p>
                </DropDownRow>
            </Dropdown>
        </div>
    )
}

export default TranslateButton;