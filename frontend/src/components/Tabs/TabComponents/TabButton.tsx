import "../../../styles/TabButton.css"

import TabContent from "../TabContent/TabContent.tsx";

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
            <button
                onClick={() => {
                    self.select()
                }}
            >
                <p>{self.name}</p>
            </button>
        </div>
    )
}

export default TabButton;