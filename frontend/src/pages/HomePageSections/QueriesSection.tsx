import React from "react";
import '../../styles/HomePage.css'
import {Link} from "react-router-dom";
import Screenshot1 from "../../assets/QueriesSectionScreenshots/FullTranslation.png";
import Screenshot2 from "../../assets/QueriesSectionScreenshots/NewTab-Query.png";
import Screenshot3 from "../../assets/QueriesSectionScreenshots/Query-over-NewTab.png";

const QueriesSection: React.FC = () => {

    return (
        <div className="queries">
            <div className="content">
                <div className="top-text">
                    <h2>Explore and Develop Queries</h2>
                    <p>
                        Using our IDE you can translate between different SQL and NoSQL technologies seamlessly!
                        <br/> Evaluate the queries you run using our in-built databases!
                        <br/> Bet you think this is cool. Nerd.
                    </p>
                </div>
                <div className="buttons">
                    <button className="translate">
                        <Link
                            to="/translator"
                            style={{color: 'inherit', textDecoration: 'inherit'}}
                        >Translate</Link>
                    </button>
                    <button className="documentation">
                        <Link
                            to="/documentation"
                            style={{color: 'inherit', textDecoration: 'inherit'}}
                        >Documentation</Link>
                    </button>
                    <button className="documentation">
                        <Link
                            to="/help"
                            style={{color: 'inherit', textDecoration: 'inherit'}}
                        >Help</Link>
                    </button>
                </div>
                <div className="images">
                    <img className="image1" src={Screenshot1} alt="IDE"/>
                    <img className="image2" src={Screenshot2} alt="IDE"/>
                    <img className="image3" src={Screenshot3} alt="IDE"/>
                </div>
                </div>
            </div>

    );
}

export default QueriesSection;