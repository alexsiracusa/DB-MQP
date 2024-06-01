import React from "react";
import { useState } from "react";

const Home = () => {
    const [inputValue, setInputValue] = useState('');
    const [submittedValue, setSubmittedValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmittedValue(inputValue);
    };

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <h1>Database MQP</h1>
                    <h2>Type SQL Query (Oracle) into textbox and return NOSQL Query (MongoDB)</h2>
                    <h3>**Prototype**</h3>
                    {/* Form element */}
                    <form onSubmit={handleSubmit} className="form-container">
                        {/* Textbox input */}
                        <textarea
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Type something..."
                            rows={10}
                            cols={50}
                            style={{ width: '80%', height: '200px', boxSizing: 'border-box' }} // Ensure padding doesn't affect width/height
                        />
                        {/* Submit button */}
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                    {/* Display the submitted value */}
                    {submittedValue && <p>The NOSQL Query is: {submittedValue}</p>}
                </header>
            </div>
        </>
    )
}

export default Home;