import React from "react";
import ReportPageCover from '../assets/ReportSectionAssets/ReportCoverPage.png'


interface ReportSectionInt {
    altText: string;
    title: string;
    text: string;
}

const Report: React.FC<ReportSectionInt> = ({ altText, title, text }) => {
    return(
    <div className="container">
        <img src={ReportPageCover} alt={altText} className="image" />
        <div>
        <h2 className="title">{title}</h2>
        <p className="text">{text}</p> 
        </div>
    </div>
    )
}

export default Report;