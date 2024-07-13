import '../../../../styles/TabContent.css'
import '../../../../styles/QueryTabCode.css'

// Monaco Editor docs:
// npm: https://www.npmjs.com/package/@monaco-editor/react#usage
// github: https://github.com/suren-atoyan/monaco-react
// settings: https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor.IStandaloneEditorConstructionOptions.html

import Editor from '@monaco-editor/react';
import QueryTab from "./QueryTab.tsx";
import {useStateCallback, updateState} from "../../../../useStateCallback.tsx";
import LoadingIcon from "../../../../assets/Icons/LoadingIcon.svg"
import type monaco from 'monaco-editor';

type QueryTabCodeProps = {
    self: QueryTab
}

const QueryTabCode = (props: QueryTabCodeProps) => {
    const [, setState] = useStateCallback({});
    const self = props.self;
    self.updateCode = updateState(setState);

    // @ts-expect-error: doesn't like event not being used
    function handleEditorChange(value: string | undefined, event) { // eslint-disable-line
        self.query = value ? value : "";
    }

    function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
        self.parent.editor = editor;
    }

    return (
        <div className="tab-content editor-content">
            {!self.loaded &&
                // https://loading.io/
                // Cool loading icon maker (have to make free account)
                <img src={LoadingIcon}/>
            }
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
                    readOnly: self.locked || !self.loaded,
                    fixedOverflowWidgets: true
                }}
            />
        </div>
    )
}

export default QueryTabCode;