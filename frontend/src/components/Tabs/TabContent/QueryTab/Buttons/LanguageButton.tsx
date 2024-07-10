import '../../../../../styles/QueryTabToolbar.css';

import {databaseLanguages} from "../../../../../DatabaseLanguage.tsx";
import QueryTab from "../QueryTab.tsx";
import Dropdown from "../../../../Dropdown.tsx";
import DropDownRow from "../../../../DropDownRow.tsx";
import {useState} from "react";
import TriangleDown from "../../../../../assets/Icons/TriangleDown.svg";


type FileTypeButtonProps = {
    self: QueryTab;
}

const LanguageButton = (props: FileTypeButtonProps) => {
    const self = props.self;
    const [language, setLanguage] = useState(self.language)

    // needed when moving tabs between windows, no idea why
    if (language != self.language) {
        setLanguage(self.language)
    }

    function setValue(newValue: string) {
        props.self.language = newValue
        setLanguage(newValue)
        self.updateCode();
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

export default LanguageButton;