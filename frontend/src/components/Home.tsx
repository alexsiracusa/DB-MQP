import React, { useState } from 'react';
import geminiInst from '../geminiInst';
import './Home.css'

type Message = {
    text: string,
    sender: 'ai' | 'user'
  }
  
  const Home: React.FC = () => {
    const [inputCode, setInputCode] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
  
    const handleConvert = async (input: string) => {
      const result = await geminiInst(input);
      return result.outputCode;
    };
  
    const handleSubmit: React.FormEventHandler = async (e) => {
      e.preventDefault();
      const userMessage: Message = {
        text: inputCode,
        sender: 'user'
      };
  
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInputCode('');
  
      const aiResponse = await handleConvert(inputCode);
  
      const aiMessage: Message = {
        text: aiResponse,
        sender: 'ai'
      };
  
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    };
  
    return (
      <div>
        <h1>Database MQP</h1>
        <div>
          <p className="message ai">
            Input a SQL (Oracle) Query and I will translate it to a NOSQL (MongoDB) Query
          </p>
          {messages.map((message, index) => (
            <p key={index} className={"message " + message.sender}>
              {message.text}
            </p>
          ))}
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
      </div>
    );
  };
  
  export default Home;