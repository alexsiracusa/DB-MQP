import "bootstrap/dist/css/bootstrap.min.css";
import DocumentQueryContainer from "../components/DocumentQueryContainer.tsx";
import styles from "../styles/Document.module.css";
import Navbar from "../components/TopNavBar.tsx";

const Document = () => {
    return (
        <>
            <div className="DocumentPage">
                <Navbar></Navbar>

                <div className={styles.pageContainer}>
                    <h1 className={styles.title}> Title One </h1>
                    <p className={styles.text}> just some example text here</p>
                    <DocumentQueryContainer languagesArr={["SQL", "NoSQL"]} codeOptionsArr={[
                        ["DROP TABLE *;"],
                        ["Drop the tables for me.", "Pretty please?"],
                    ]}/>
                    <h1 className={styles.title}> Title TWO </h1>
                    <p className={styles.text}> A much better example with much more words which is really how you can tell if something is good. If there were not as many words it would not be as good. Simple as that. Really not all that complicated when you think about it.</p>
                    <DocumentQueryContainer languagesArr={["MySQL", "MongoDB", "PostgreSQL"]} codeOptionsArr={[
                        ["this is a very very very very very very very very very very very very long piece of code to show the numbering of line", "this", "is", "many", "lines", "od", "code", "to", "show", "double", "digits"],
                        ["line 33333333333333333333333333333 33333333333333333333 333333333 33333333333333 333333333333333 33333333", "line 4"],
                        ["line 3", "line 4", "line 4", "line 4", "line 4", "line 4", "line 4", "line 4", "line 4", "line 4", "line 4", "line 4", "line 4"]
                    ]}/>
                </div>
            </div>
        </>
    );
}

export default Document;