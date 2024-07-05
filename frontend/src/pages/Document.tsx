import "bootstrap/dist/css/bootstrap.min.css";
import DocumentQueryContainer from "../components/DocumentQueryContainer.tsx";
import styles from "../styles/Document.module.css";

const Document = () => {
    return (
        <>
            <div>

                <div className={styles.pageContainer}>
                    <div>
                        <h1 className={"justify-content-center"}>This is the document page!</h1>
                    </div>
                    <div className={"mt-5 px-5"}>
                        <p> just some example text here</p>

                    </div>
                    <div className={"px-5 py-1"}>
                        <DocumentQueryContainer languagesArr={["SQL", "NoSQL"]} codeOptionsArr={[
                            ["line 1", "line 2"],
                            ["line 3", "line 4"]
                        ]}/>
                    </div>
                    <div className={"px-5 py-1"}>
                        <DocumentQueryContainer languagesArr={["MySQL", "MongoDB", "PostgreSQL"]} codeOptionsArr={[
                            ["line 1", "line 2"],
                            ["line 3", "line 4"],
                            ["line 3", "line 4", "line 4", "line 4", "line 4"]
                        ]}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Document;