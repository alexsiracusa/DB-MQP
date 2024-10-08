import '../../../../../styles/NewTab.css'

import NewTab from "../NewTab.tsx"
import FileContent from "../../../../../assets/Icons/FileContent.svg"
import ArrowRight from "../../../../../assets/Icons/ArrowRight.svg"

type GenerateQueryButtonProps = {
    self: NewTab
}

const GenerateQueryButton = (props: GenerateQueryButtonProps) => {
    const self = props.self;

    async function generateQueryTab() {
        await self.toAIQueryTab()
    }

    return (
        <button
            onClick={generateQueryTab}
        >
            <div className="left">
                <img src={FileContent}/>
                Generate Query
            </div>
            <div className="right">
                <img src={ArrowRight}/>
            </div>
        </button>
    )
}

export default GenerateQueryButton;