import React from "react";
import '../styles/PersonCard.css'
import profilePicture from '../assets/ProfileImages/Wong.png'

const PersonCard: React.FC = () => {

    return (
        <div className="person-card-container">
            <img src={profilePicture} />
            <div className="about">
                <h3>
                    Professor Wong
                </h3>
                <p>
                    Destroyer of worlds, advisor of our mqp, and much more.
                    Wong strikes fear into the hearts of his enemies wherever
                    he goes.
                </p>
            </div>
        </div>
    );
}

export default PersonCard;