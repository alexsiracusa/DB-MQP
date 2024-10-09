import '../../../../../styles/QueryTabToolbar.css';

import UserQueryTab from "../UserQueryTab.tsx";
import Dropdown from "../../../../Dropdown.tsx";
import DropDownRow from "../../../../DropDownRow.tsx";
import {databaseFromLanguage, databaseLanguages} from "../../../../../DatabaseLanguage.tsx";


type TranslateButtonProps = {
    self: UserQueryTab;
}

const TranslateButton = (props: TranslateButtonProps) => {
    const self = props.self;

    async function setValue(newValue: string) {
        await self.translate(newValue)
    }

    function disabled(): boolean {
        return !self.isLoaded();
    }

    return (
        <div className="translate-button toolbar-button">
            <Dropdown
                icon={
                    <>
                        <p>Translate to</p>
                    </>
                }
                title=""
                className="translate-icon"
                disabled={disabled()}
                onChange={setValue}
            >
                { databaseLanguages.map((language: string) => (
                    <DropDownRow value={language} className="language-row" key={language}>
                        <p>{language + ` (${databaseFromLanguage[language]})`}</p>
                    </DropDownRow>
                ))}
            </Dropdown>
        </div>
    )
}

export default TranslateButton;