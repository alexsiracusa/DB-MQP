import React, { useState } from 'react';
import geminiInst from '../geminiInst';
import './Home.css'

const Home: React.FC = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');

  const handleConvert = async () => {
    const result = await geminiInst(inputCode);
    setOutputCode(result.outputCode);
  };

  return (
    
    <div>
      <h1>Database MQP</h1>

      <div>
    <p className="message ai">
        Input a SQL (Oracle) Query and I will translate it to a NOSQL (MongoDB) Query
      </p>
      <p className="message user">
        {inputCode}
      </p>
      
    </div>
      <p className="message ai">{outputCode}</p>
      <textarea
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      /><button onClick={handleConvert}>Submit</button>
    </div>
  );
};

export default Home;