import '../../../../../styles/QueryTabToolbar.css';

import UserQueryTab from "../UserQueryTab.tsx";
import Dropdown from "../../../../Dropdown.tsx";
import DropDownRow from "../../../../DropDownRow.tsx";
import TriangleDown from "../../../../../assets/Icons/TriangleDown.svg";
import {databaseLanguages} from "../../../../../DatabaseLanguage.tsx";

type TranslateButtonProps = {
    self: UserQueryTab;
}

const TranslateButton = (props: TranslateButtonProps) => {
    const self = props.self;

    function setValue(newValue: string) {
        self.translate(newValue)
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
                { databaseLanguages.map((language: string) => (
                    <DropDownRow value={language} className="row">
                        <p>{language}</p>
                    </DropDownRow>
                ))}
            </Dropdown>
        </div>
    )
}

export default TranslateButton;