import '../../../../../styles/QueryTabToolbar.css';

import UserQueryTab from "../UserQueryTab.tsx";
import Dropdown from "../../../../Dropdown.tsx";
import DropDownRow from "../../../../DropDownRow.tsx";
import TriangleDown from "../../../../../assets/Icons/TriangleDown.svg";

type TranslateButtonProps = {
    self: UserQueryTab;
}

const TranslateButton = (props: TranslateButtonProps) => {
    const self = props.self;

    function setValue(newValue: string) {
        switch (newValue) {
            case "pgSQL": {
                console.log(props.self.id)
                self.translate("pgSQL")
                break;
            }
            case "MongoDB": {
                console.log(props.self.id)
                self.translate("MongoDB")
                break;
            }
        }
    }

    return (
        <div className="translate-button toolbar-button">
            <Dropdown
                icon={
                    <>
                        <img src={TriangleDown}/>
                        <p>Translate</p>
                    </>
                }
                className="dropdown-icon"
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