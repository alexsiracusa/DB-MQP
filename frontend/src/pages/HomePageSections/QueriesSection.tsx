import React from "react";
import '../../styles/HomePage.css'

const QueriesSection: React.FC = () => {

    return (
        <div className="queries">
            <div className="content">
                <div className="top-text">
                    <h2>Explore and Develop Queries</h2>
                    <p>Using our IDE you can write long sentences that fill space and look cool if your a big enough nerd for this kinda stuff. <br /> Bet you think this is cool. Nerd.</p>
                </div>
                <div className="buttons">
                        <button className="translate">translate</button>
                        <button className="documentation">documentation</button>
                </div>
            </div>
        </div>
    );
}

export default QueriesSection;