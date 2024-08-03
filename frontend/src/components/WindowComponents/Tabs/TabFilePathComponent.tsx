import "../../../styles/TabFilePath.css"

import Tab from "./Tab.tsx";
import ChevronRight from "../../../assets/Icons/ChevronRight.svg";
import TabWindow from "../Windows/TabWindow/TabWindow.tsx";

type TabFilePathComponentProps = {
    parentWindow: TabWindow
    path: Tab[]
}

const TabFilePathComponent = (props: TabFilePathComponentProps) => {

    async function selectTab(tab: Tab) {
        await tab.select();
    }

    return (
        <div className="tab-file-path">
            {props.path.map((tab: Tab, index: number) => {
                return (
                    <div
                        className="tab-file-path-group"
                        key={index}
                    >
                        <button onClick={() => {selectTab(tab)}}>
                            <p>{tab.name}</p>
                        </button>
                        {index < props.path.length - 1 &&
                            <img src={ChevronRight}/>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default TabFilePathComponent;