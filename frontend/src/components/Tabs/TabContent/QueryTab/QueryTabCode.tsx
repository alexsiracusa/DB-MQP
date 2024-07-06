import '../../../../styles/TabContent.css'
import '../../../../styles/QueryTabCode.css'

import Editor from '@monaco-editor/react';
import QueryTab from "./QueryTab.tsx";

type QueryTabCodeProps = {
    self: QueryTab
}

const QueryTabCode = (props: QueryTabCodeProps) => {
    const self = props.self;

     // @ts-expect-error: doesn't like event not being used
    function handleEditorChange(value: string | undefined, event: any) { // eslint-disable-line
        self.query = value ? value : "";
    }

    return (
        <div className="tab-content">
            <Editor
                height="100%"
                defaultLanguage="sql"
                defaultValue={self.query}
                onChange={handleEditorChange}
                options={{
                    minimap: {
                        enabled: false
                    }
                }}
            />
        </div>
    )
}

export default QueryTabCode;