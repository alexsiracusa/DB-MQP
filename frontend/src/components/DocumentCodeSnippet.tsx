import "bootstrap/dist/css/bootstrap.min.css";

import {useState} from "react";

const DocumentCodeSnippet = ({codeArr}: { codeArr: string[] }) => {
    const [linesOfCode] = useState(codeArr);
    return (
        <>
            {linesOfCode.map((line) => (
                <p>{line}</p>
            ))}
        </>
    );
}

export default DocumentCodeSnippet;