import '../../../../styles/TabContent.css'
import '../../../../styles/QueryTabCode.css'

import Editor from '@monaco-editor/react';
import QueryTab from "./QueryTab.tsx";
import React from "react";

type QueryTabCodeProps = {
    self: QueryTab
}

const QueryTabCode = (props: QueryTabCodeProps) => {
    const [, updateState] = React.useState({});
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const self = props.self;

    // @ts-expect-error: doesn't like event not being used
    function handleEditorChange(value: string | undefined, event) { // eslint-disable-line
        self.query = value ? value : "";
    }

    self.updateCode = forceUpdate

    return (
        <div className="tab-content">
            <Editor
                height="100%"
                theme="light"
                language={self.editorLanguage()}
                defaultLanguage={self.editorLanguage()}
                defaultValue={self.query}
                onChange={handleEditorChange}
                path={self.id} // needed for multi-editor functionality to work properly
                options={{
                    minimap: {
                        enabled: false
                    },
                    lineNumbersMinChars: 3,
                    lineDecorationsWidth: 0,
                    renderLineHighlight: "all",
                    roundedSelection: false,
                    scrollBeyondLastLine: true,
                    readOnly: self.locked
                }}
            />
        </div>
    )
}

export default QueryTabCode;