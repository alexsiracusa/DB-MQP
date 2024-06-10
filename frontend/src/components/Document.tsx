import "bootstrap/dist/css/bootstrap.min.css";
import DocumentQueryContainer from "./DocumentQueryContainer";
import styles from "../styles/Document.module.css";

const Document = () => {
    return (
        <>
            <div>
            <DocumentQueryContainer />

        <div className={styles.pageContainer}>
            <div className={"justify-content-center"}>
                <h1>This is the document page!</h1>
            </div>
            <div className={"mt-5"}>
                <p>This is some content in the lower part of the page.</p>
                <p>It spans the entirety of the webpage.</p>

            </div>
        </div>
            </div>
        </>
    );
}

export default Document;