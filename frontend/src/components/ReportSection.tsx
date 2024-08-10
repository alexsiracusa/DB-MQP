import "../styles/HomePage.css"

import React from "react";
import ReportPageCover from '../assets/ReportSectionAssets/ReportCoverPage.png'


interface ReportSectionInt {
    altText: string;
    link: string;
}

                    

const Report: React.FC<ReportSectionInt> = ({altText, link}) => {

    const handleClick = () => {
        window.open(link, '_blank');
    };

    return (
        <div className="report">
            <img src={ReportPageCover} alt={altText} className="image" onClick={handleClick}
                 style={{cursor: 'pointer'}}/>
            <div className="text-content">
                <h2 className="title">Link to Report</h2>
                <p className="text">This team's report on the project developed can be read by clicking the image. 
                This report was written as part of a project graduation requirement at Worcester Polytechnic Institute. 
                </p>
                <br></br>
                <h3 className="subtitle"> This is our abstract:</h3>
                <br></br>
                <p className="text">Add abstract here</p>
            </div>
        </div>
    )
}

export default Report;