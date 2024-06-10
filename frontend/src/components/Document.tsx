import "bootstrap/dist/css/bootstrap.min.css";
import DocumentQueryContainer from "./DocumentQueryContainer";
import styles from "../styles/Document.module.css";

const Document = () => {
    return (
        <>
            <div>

        <div className={styles.pageContainer}>
            <div className={"justify-content-center"}>
                <h1>This is the document page!</h1>
            </div>
            <div className={"mt-5"}>
                <p> just some example text here</p>

            </div>
            <div className={"px-5 py-5"}>
                <DocumentQueryContainer />
            </div>
        </div>
            </div>
        </>
    );
}

export default Document;