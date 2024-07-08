import '../../../../../styles/NewTab.css'

import NewTab from "../NewTab.tsx";

type NewQueryButtonProps = {
    self: NewTab
}

const NewQueryButton = (props: NewQueryButtonProps) => {
    const self = props.self;

    function makeQueryTab() {

    }

    return (
        <button
            onClick={makeQueryTab}
        >
            Query Tab
        </button>
    )
}

export default NewQueryButton;