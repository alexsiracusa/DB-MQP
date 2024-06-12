import React, { useState } from 'react';
import geminiInst from '../geminiInst';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './Translator.css'
import Navbar from './Navbar';

  
  const Translator: React.FC = () => {
    const [inputCode, setInputCode] = useState('');
    const [outputCode, setOutputCode] = useState('');
    const [explanation, setExplanation] = useState('');
    const [keyDifferences, setKeyDifferences] = useState('');

    const handleConvert = async (input: string) => {
      const result = await geminiInst(input);
      return result.outputCode;
    };
  
    const handleSubmit: React.FormEventHandler = async (e) => {
      e.preventDefault();
      const aiResponse = await handleConvert(inputCode);
      const parsedResult = parseResponse(aiResponse);
      setOutputCode(parsedResult.outputCode);
      setExplanation(parsedResult.explanation);
      setKeyDifferences(parsedResult.keyDifferences);
    };
  
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
    
        return { outputCode, explanation, keyDifferences };
      };


    return (
      <div>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <div className='Translator'>
        <Navbar/>
      <div>
        <h1>Database MQP</h1>
        <div>
          <p>
            Input a SQL (Oracle) Query and I will translate it to a NOSQL (MongoDB) Query
          </p>
        </div>
        <form className='input-form' onSubmit={handleSubmit}>
          <textarea
            placeholder="Query goes here"
            value={inputCode}
            onChange={e => setInputCode(e.currentTarget.value)}
            rows={5}
            cols={70}
          />
          <input type='submit' value="Send" />
        </form>
        {outputCode.startsWith('sql') ? (
          <div className="result-section">
            <div className="code-block">
              <h2>SQL Code</h2>
              <SyntaxHighlighter language="sql" style={docco}>
                {outputCode.substring(4).trim()} {/* Trim the first 5 characters (```sql) */}
              </SyntaxHighlighter>
            </div>
          </div>
        )
      : (
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
          )))
        }
        </div>
        </div>
        </div>
        )};
  
  export default Translator;