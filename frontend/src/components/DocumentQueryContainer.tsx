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
                        <Nav.Link key={index} style={{flex:1}} className={`${index == currIndex? styles.selected : styles.nonSelected} ${index == 0? styles.left : index == codeOptionsArr.length - 1? styles.right : styles.middle}`} onClick={() => handleCodeChange(index)}>{language}</Nav.Link>
                    ))}
                </Nav>
            </div>
            <div className={styles.queryContainerBody}>
            {codeOptionsArr[currIndex].map((line, index) => (
                <div className={"flex"}>
                    <p className={styles.numbering}>{index + 1}</p>
                    <p className={styles.code}>{line}</p>
                </div>
            ))}
            </div>
        </>
    );
}

export default DocumentQueryContainer;