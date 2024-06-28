import "../../../styles/TabButton.css"

import TabContent from "../TabContent/TabContent.tsx";

type TabButtonProps = {
    self: TabContent;
}

const TabButton = (props: TabButtonProps) => {
    const self  = props.self;

    return (
        <div className="tab-button-container">
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