import React, {useState, ChangeEvent} from 'react';
import geminiInst from '../geminiInst.ts';
import SQLRequest from '../sqlSampleRequest.ts';
import {Light as SyntaxHighlighter} from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import '../styles/Translator.css'
import Navbar from '../components/Navbar.tsx';


const Translator: React.FC = () => {
    const [inputCode, setInputCode] = useState('');
    const [writtenCode, setWrittenCode] = useState('');
    const [outputCode, setOutputCode] = useState('');
    const [explanation, setExplanation] = useState('');
    const [keyDifferences, setKeyDifferences] = useState('');
    const [originTech, setOriginTech] = useState<string>("");
    const [destTech, setDestTech] = useState<string>("");
    //const [outputLang, setOutputLang] = useState<string>("");

    const handleConvert = async (input: string) => {
        const result = await geminiInst(input, originTech, destTech);
        return result.outputCode;
    };

    const handleSubmit: React.FormEventHandler = async (e) => {
        e.preventDefault();
        setInputCode(writtenCode);
        const aiResponse = await handleConvert(writtenCode);
        const parsedResult = parseResponse(aiResponse);
        setOutputCode(parsedResult.outputCode);
        setExplanation(parsedResult.explanation);
        setKeyDifferences(parsedResult.keyDifferences);
    };

    const handleOriginChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setOriginTech(event.target.value);
    };

    const handleDestChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setDestTech(event.target.value);
    };

    const handleSQLRequest = async () => {
        const result = await SQLRequest();
        setExplanation("");
        setKeyDifferences("");
        setInputCode("");
        return result;

    }

    const handleSubmitQuery: React.FormEventHandler = async (e) => {
        e.preventDefault();
        const aiResponse = await handleSQLRequest();
        const parsedResponse = parseResponse(aiResponse);
        setOutputCode(parsedResponse.outputCode);
    }

    const parseResponse = (response: string) => {
        const javascriptMarker = '```';
        const explanationMarker = '```Explanation';
        const keyDifferencesMarker = '```Key Differences';

        const codeStart = response.indexOf(javascriptMarker) + javascriptMarker.length;
        const codeEnd = response.indexOf('```', codeStart);
        const explanationStart = response.indexOf(explanationMarker) + explanationMarker.length;
        const explanationEnd = response.indexOf('```', explanationStart);
        const keyDifferencesStart = response.indexOf(keyDifferencesMarker) + keyDifferencesMarker.length;
        const keyDifferencesEnd = response.indexOf('```', keyDifferencesStart);

        const outputCode = response.substring(codeStart, codeEnd).trim();
        const explanation = response.substring(explanationStart, explanationEnd).trim();
        const keyDifferences = response.substring(keyDifferencesStart, keyDifferencesEnd).trim();

        return {outputCode, explanation, keyDifferences};
    };


    return (
        <div>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </head>
            <div className='Translator'>
                <Navbar/>
                <div>
                    <h1>Translator</h1>
                    <div>
                        <p>
                            Input a SQL (Oracle) Query and I will translate it to a NOSQL (MongoDB) Query
                        </p>
                    </div>
                    <form className='input-form' onSubmit={handleSubmit}>
                        <label>
                            Translate from:
                            <select value={originTech} onChange={handleOriginChange}>
                                <option value="" disabled>Translate from:</option>
                                <option value="Oracle(SQL)">SQL</option>
                                <option value="MongoDB (NOSQL)">MongoDB</option>
                            </select>
                        </label>
                        <label>
                            Translate to:
                            <select value={destTech} onChange={handleDestChange}>
                                <option value="" disabled>Translate to:</option>
                                <option value="Oracle(SQL)">SQL</option>
                                <option value="MongoDB (NOSQL)">MongoDB</option>
                            </select>
                        </label>
                        <textarea
                            placeholder="Query goes here"
                            value={writtenCode}
                            onChange={e => setWrittenCode(e.currentTarget.value)}
                            rows={5}
                            cols={70}
                        />
                        <input type='submit' value="Send"/>
                    </form>
                    <form className='input-form' onSubmit={handleSubmitQuery}>
                        <input type='submit' value="Sample SQL Query"/>
                    </form>

                    {
                        outputCode.startsWith('sql') ? (
                            <div className="result-section">
                                <div className="code-container">
                                    {inputCode && (<div className="code-block">
                                            <h2>Input Code</h2>
                                            <SyntaxHighlighter language="javascript" style={docco}>
                                                {inputCode}
                                            </SyntaxHighlighter>
                                        </div>
                                    )}
                                    <div>
                                        <h2>Converted Code</h2>
                                        <SyntaxHighlighter language="sql" style={docco}>
                                            {outputCode}
                                        </SyntaxHighlighter>
                                    </div>
                                </div>
                                {explanation && (
                                    <div>
                                        <h2>Explanation</h2>
                                        <pre className="explanation-text">
                                            {explanation}
                                        </pre>
                                    </div>
                                )}
                                {keyDifferences && (
                                    <div>
                                        <h2>Key Differences</h2>
                                        <pre className="explanation-text">
                                            {keyDifferences}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        ) : (
                            (outputCode && (
                                <div className="result-section">
                                    <div className="code-container">
                                        <div className="code-block">
                                            <h2>Input Code</h2>
                                            <SyntaxHighlighter language="sql" style={docco}>
                                                {inputCode}
                                            </SyntaxHighlighter>
                                        </div>
                                        <div>
                                            <h2>Converted Code</h2>
                                            <SyntaxHighlighter language="javascript" style={docco}>
                                                {outputCode}
                                            </SyntaxHighlighter>
                                        </div>
                                    </div>
                                    {explanation && (
                                        <div>
                                            <h2>Explanation</h2>
                                            <pre className="explanation-text">
                                                {explanation}
                                            </pre>
                                        </div>
                                    )}
                                    {keyDifferences && (
                                        <div>
                                            <h2>Key Differences</h2>
                                            <pre className="explanation-text">
                                                {keyDifferences}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default Translator;