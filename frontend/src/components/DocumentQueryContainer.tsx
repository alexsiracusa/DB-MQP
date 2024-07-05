import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Document.module.css";
import {Nav} from "react-bootstrap";
import {useState} from "react";

const DocumentQueryContainer = ({ languagesArr, codeOptionsArr }: { languagesArr: string[], codeOptionsArr: string[][] }) => {
    const [languages] = useState(languagesArr);
    const [currIndex, setCurrIndex] = useState(0);

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
                {codeOptionsArr[currIndex].map((line) => (
                    <p className={styles.code}>{line}</p>
                ))}
            </div>
        </>
    );
}

export default DocumentQueryContainer;