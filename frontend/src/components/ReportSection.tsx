import "../styles/HomePage.css"

import React from "react";
import ReportPageCover from '../assets/ReportSectionAssets/ReportCoverPage.png'


interface ReportSectionInt {
    altText: string;
    title: string;
    text: string;
    link: string;
}

const Report: React.FC<ReportSectionInt> = ({altText, title, text, link}) => {

    const handleClick = () => {
        window.open(link, '_blank');
    };

    return (
        <div className="report">
            <img src={ReportPageCover} alt={altText} className="image" onClick={handleClick}
                 style={{cursor: 'pointer'}}/>
            <div className="text-content">
                <h2 className="title">{title}</h2>
                <p className="text">{text}</p>
            </div>
        </div>
    )
}

export default Report;