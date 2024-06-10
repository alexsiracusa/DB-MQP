import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Document.module.css";
import {Nav} from "react-bootstrap";
import {useEffect, useState} from "react";

const DocumentQueryContainer = ({ languagesArr, codeOptionsArr }: { languagesArr: string[], codeOptionsArr: JSX.Element[] }) => {
    const [languages] = useState(languagesArr);
    const [codeOptions] = useState<JSX.Element[]>(codeOptionsArr);
    const [code, setCode] = useState(codeOptions[0]);
    const [currIndex, setCurrIndex] = useState(0);

    useEffect(() => {
        setCode(codeOptions[currIndex]);
    }, [currIndex]);

    function handleCodeChange(index: number) {
        setCurrIndex(index);
    }

    return (
        <>
            <div className={styles.queryContainerHead}>
                <Nav className="justify-content-around flex w-100">
                    {languages.map((language, index) => (
                        <Nav.Link key={index} style={{color: index === currIndex ? "green" : "black"}} onClick={() => handleCodeChange(index)}>{language}</Nav.Link>
                    ))}
                </Nav>
            </div>
            <div className={styles.queryContainerBody}>
                {code}
            </div>
        </>
    );
}

export default DocumentQueryContainer;