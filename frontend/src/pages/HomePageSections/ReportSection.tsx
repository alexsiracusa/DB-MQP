import React from "react";

import Report from "../../components/ReportSection";
import '../../styles/HomePage.css'

const ReportSection: React.FC = () => {

    return (
        <div className="report">
            <div className="content">
                <h2>Report Section</h2>
                <Report
                    altText="Report Cover Page"
                    title="Link to Report"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    link="https://google.com"
                />
            </div>
        </div>
    );
}

export default ReportSection;