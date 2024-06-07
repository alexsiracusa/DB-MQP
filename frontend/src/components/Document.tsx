import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Document.css";

const Document = () => {
    return (
        <div className={"pageContainer"}>
            <div className={"justify-content-center"}>
                <h1>This is the document page!</h1>
            </div>
            <div className={"mt-5"}>
                <p>This is some content in the lower part of the page.</p>
                <p>It spans the entirety of the webpage.</p>

            </div>
        </div>
    );
}

export default Document;