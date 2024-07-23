import '../../../../../styles/QueryTabToolbar.css';

import {DatabaseLanguage, databaseFromLanguage, databaseLanguages} from "../../../../../DatabaseLanguage.tsx";
import QueryTab from "../QueryTab.tsx";
import Dropdown from "../../../../Dropdown.tsx";
import DropDownRow from "../../../../DropDownRow.tsx";
import {useState} from "react";
import TriangleDown from "../../../../../assets/Icons/TriangleDown.svg";
import TranslatedQueryTab from "../TranslatedQueryTab.tsx";


type LanguageButtonProps = {
    self: QueryTab;
}

const LanguageButton = (props: LanguageButtonProps) => {
    const self = props.self;
    const [language, setLanguage] = useState(self.language)

    // needed when moving tabs between windows, no idea why
    if (language != self.language) {
        setLanguage(self.language)
    }

    async function setValue(newValue: string) {
        setLanguage(newValue)

        if (self instanceof TranslatedQueryTab) {
            await self.setLanguage(newValue);
        }
        else {
            props.self.language = newValue;
            await self.updateCode();
        }
    }

    function disabled(): boolean {
        return (
            !self.isLoaded()
        );
    }

    function rowExists(forLang: DatabaseLanguage): boolean {
        if (self instanceof TranslatedQueryTab) {
            return self.controller.languageExists(forLang);
        }
        return true;
    }

    return (
        <div className="language-button toolbar-button">
            <Dropdown
                icon={
                    <>
                        <img src={TriangleDown}/>
                        <p>{language}</p>
                    </>
                }
                className="dropdown-icon"
                title="Language"
                disabled={disabled()}
                onChange={setValue}
            >
                { databaseLanguages.map((language: string) => (
                    <DropDownRow
                        value={language}
                        className={ rowExists(language) ? "language-row" : "language-row opacity"}
                        key={language}
                    >
                        <p>{language + ` (${databaseFromLanguage[language]})`}</p>
                    </DropDownRow>
                ))}
            </Dropdown>
        </div>
    )
}

export default LanguageButton;