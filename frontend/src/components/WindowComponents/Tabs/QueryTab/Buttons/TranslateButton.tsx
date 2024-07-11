import '../../../../../styles/QueryTabToolbar.css';

import UserQueryTab from "../UserQueryTab.tsx";
import Dropdown from "../../../../Dropdown.tsx";
import DropDownRow from "../../../../DropDownRow.tsx";
import {databaseLanguages} from "../../../../../DatabaseLanguage.tsx";
// import TranslateIcon from "../../../../../assets/Icons/TranslateIcon.svg";


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
                        {/*<img src={TranslateIcon}/>*/}
                        <p>Translate</p>
                    </>
                }
                className="translate-icon"
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