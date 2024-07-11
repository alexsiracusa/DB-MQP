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
        (async () => {
            if (self.loaded) {
                return;
            }
            const gemini = new Gemini();

            const inputCode = self.original.query;
            const inputLang = self.original.language;
            const outputLang = self.language;

            // makes this request twice
            const result = await gemini.translate(inputCode, inputLang, outputLang)

            if (!self.loaded) {
                self.query = result.code
                if (self.parent.editor) {
                    self.parent.editor.setValue(result.code)
                }
                self.loaded = true;
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