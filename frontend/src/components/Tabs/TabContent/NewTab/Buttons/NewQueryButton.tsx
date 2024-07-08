import '../../../../../styles/NewTab.css'

import NewTab from "../NewTab.tsx";
import File from "../../../../../assets/Icons/File.svg"
import ArrowRight from "../../../../../assets/Icons/ArrowRight.svg";

type NewQueryButtonProps = {
    self: NewTab
}

const NewQueryButton = (props: NewQueryButtonProps) => {
    const self = props.self;

    function makeQueryTab() {
        console.log(self.id)
    }

    return (
        <button
            onClick={makeQueryTab}
        >
            <div className="left">
                <img src={File}/>
                New Query
            </div>
            <div className="right">
                <img src={ArrowRight}/>
            </div>
        </button>
    )
}

export default NewQueryButton;