import React from "react";

import Report from "../../components/ReportSection";
import '../../styles/HomePage.css'

const ReportSection: React.FC = () => {

    return (
        <div className="report">
            <div className="content">
                <h2>Read The Report</h2>
                <Report
                    altText="Report Cover Page"
                    link="https://google.com"
                />
            </div>
        </div>
    );
}

export default ReportSection;