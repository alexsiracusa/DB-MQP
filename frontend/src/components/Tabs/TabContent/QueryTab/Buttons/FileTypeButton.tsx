import '../../../../../styles/QueryTabToolbar.css';

import QueryTab from "../QueryTab.tsx";
import Dropdown from "../../../../Dropdown.tsx";
import DropDownRow from "../../../../DropDownRow.tsx";
import {useState} from "react";
import TriangleDown from "../../../../../assets/Icons/TriangleDown.svg";


type FileTypeButtonProps = {
    self: QueryTab;
}

const FileTypeButton = (props: FileTypeButtonProps) => {
    const [fileType, setFileType] = useState(props.self.fileType)

    function setValue(newValue: string) {
        switch (newValue) {
            case "pgSQL": {
                props.self.fileType = newValue;
                setFileType(newValue);
                break;
            }
            case "MongoDB": {
                props.self.fileType = newValue;
                setFileType(newValue);
                break;
            }
        }
    }

    return (
        <div className="file-type-button toolbar-button">
            <Dropdown
                icon={
                    <>
                        <img src={TriangleDown}/>
                        <p>{fileType}</p>
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

export default FileTypeButton;