import '../../../../../styles/TabContent.css'

import TranslatedQueryTab from "./TranslatedQueryTab.tsx";
import QueryTabToolbar from "../QueryTabToolbar.tsx";
import QueryTabCode from "../QueryTabCode.tsx";
import Gemini from "../../../../../api/Gemini/Gemini.ts";
import React from "react";


type TranslatedQueryTabComponentProps = {
    self: TranslatedQueryTab
}

const TranslatedQueryTabComponent = (props: TranslatedQueryTabComponentProps) => {
    const self = props.self;

    React.useEffect(() => {
        // useEffect will run twice in StrictMode which is dumb, but no good solutions
        // seem to exist anymore. See StackOverflow post below
        // https://stackoverflow.com/questions/72238175/why-useeffect-running-twice-and-how-to-handle-it-well-in-react
        (async () => {
            try {
                // this definitely has concurrency bugs trying to use a regular
                // variable (self.loaded) as a lock
                if (!self.loaded) {
                    self.loaded = true;
                    const gemini = new Gemini();

                    const inputCode = self.original.query;
                    const inputLang = self.original.language;
                    const outputLang = self.language;
                    const result = await gemini.translate(inputCode, inputLang, outputLang)

                    self.query = result.code

                    // update UI if needed
                    const editor = self.editor();
                    if (editor) {
                        editor.setValue(result.code)
                        // editor.
                    }
                }
            } catch (error) {
                console.log(error)
                self.loaded = false;
            }
        })();
    });

    return (
        <div className="tab-content-container">
            <QueryTabToolbar self={self}/>
            <QueryTabCode self={self}/>
        </div>
    )
}

export default TranslatedQueryTabComponent;