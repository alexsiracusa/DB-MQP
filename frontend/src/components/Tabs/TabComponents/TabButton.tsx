import "../../../styles/TabButton.css"

import TabContent from "../TabContent/TabContent.tsx";
import XButton from "../../../assets/Icons/XButton.svg";


type TabButtonProps = {
    self: TabContent;
}

const TabButton = (props: TabButtonProps) => {
    const self  = props.self;

    function isSelected(): boolean {
        return self.parent.selected == self;
    }

    return (
        <div
            className="tab-button-container"
            style={{backgroundColor: isSelected() ? "#ffffff" : "transparent"}}
        >
            <button className="tab-name"
                onClick={() => {
                    self.select();
                }}
            >
                <p>{self.name}</p>
            </button>

            <button className="x-button"
                onClick={() => {
                    self.delete();
                }}
            >
                <img src={XButton}/>
            </button>
        </div>
    )
}

export default TabButton;