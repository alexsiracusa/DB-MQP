import '../../../../styles/TabContent.css'
import '../../../../styles/QueryTabCode.css'

// Monaco Editor docs:
// npm: https://www.npmjs.com/package/@monaco-editor/react#usage
// github: https://github.com/react-monaco-editor/react-monaco-editor?tab=readme-ov-file
// settings: https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor.IStandaloneEditorConstructionOptions.html

import Editor from '@monaco-editor/react';
import QueryTab from "./QueryTab.tsx";
import useStateCallback from "../../../../useStateCallback.tsx";
import type monaco from 'monaco-editor';

type QueryTabCodeProps = {
    self: QueryTab
}

const QueryTabCode = (props: QueryTabCodeProps) => {
    const [, updateState] = useStateCallback({});
    function forceUpdate(): Promise<void> {
        return new Promise((resolve) => {
            updateState({}, () => {
                resolve()
            })
        })
    }
    const self = props.self;

    // @ts-expect-error: doesn't like event not being used
    function handleEditorChange(value: string | undefined, event) { // eslint-disable-line
        self.query = value ? value : self.query;
    }

    function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
        self.parent.editor = editor;
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
                onMount={handleEditorDidMount}
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
                    readOnly: self.locked,
                    fixedOverflowWidgets: true
                }}
            />
        </div>
    )
}

export default QueryTabCode;