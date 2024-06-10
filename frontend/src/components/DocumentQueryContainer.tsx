import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Document.module.css";
import {Nav} from "react-bootstrap";
import {useState} from "react";

const DocumentQueryContainer = () => {
    const [languages] = useState(["English", "Spanish", "French"]);
    const [codeOptions] = useState(["code 1", "code 2", "code 3 d iodsjaonddk dkdkkd kidjhdkjd d dslsjjdkd dld djdkdlsjd sklojuhadfsoi fiueha odisjnfalkjnelkjnfaoiuusdblka oh  a ipouhodiub nl   e"]);
    const [code, setCode] = useState(codeOptions[0]);
    const [currIndex, setCurrIndex] = useState(0);

    function handleCodeChange(index: number) {
        setCode(codeOptions[index]);
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
                <p>{code}</p>
            </div>
        </>
    );
}

export default DocumentQueryContainer;