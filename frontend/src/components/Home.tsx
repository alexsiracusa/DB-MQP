import React, { useState } from 'react';
import geminiInst from '../geminiInst';
import './Home.css'


  
  const Home: React.FC = () => {
    const [inputCode, setInputCode] = useState('');
    const [outputCode, setOutputCode] = useState('');

    const handleConvert = async (input: string) => {
      const result = await geminiInst(input);
      return result.outputCode;
    };
  
    const handleSubmit: React.FormEventHandler = async (e) => {
      e.preventDefault();
      const aiResponse = await handleConvert(inputCode);
      setOutputCode(aiResponse);
    };
  
    return (
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
        <pre>
            {outputCode}
        </pre>
      </div>
    );
  };
  
  export default Home;