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
                    text="Lorem ipsum dolor sit amet. Aut voluptatem molestiae et ratione praesentium qui iusto quaerat hic doloribus dolores est veniam quidem."
                />
            </div>
        </div>
    );
}

export default ReportSection;