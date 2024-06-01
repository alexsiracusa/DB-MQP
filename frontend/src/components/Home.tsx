import React, { useState } from 'react';
import geminiInst from '../geminiInst';

// interface ConversionResult {
//   inputCode: string;
//   outputCode: string;
// }

const Home: React.FC = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');

  const handleConvert = async () => {
    const result = await geminiInst(inputCode);
    setOutputCode(result.outputCode);
  };

  return (
    <div>
      <h1>Convert Oracle to MongoDB</h1>
      <textarea
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      />
      <button onClick={handleConvert}>Convert</button>
      <pre>{outputCode}</pre>
    </div>
  );
};

export default Home;