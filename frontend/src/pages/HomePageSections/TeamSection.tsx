import React from "react";
import PersonCard from "../../components/PersonCard.tsx";
import '../../styles/HomePage.css'

const TeamSection: React.FC = () => {

    return (
        <div className="team">
            <div className="content">
                <h1>Meet The Team</h1>
                <div className="card-container">
                    <div className="column">
                        <PersonCard/>
                        <PersonCard/>
                        <PersonCard/>
                    </div>
                    <div className="column">
                        <PersonCard/>
                        <PersonCard/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamSection;