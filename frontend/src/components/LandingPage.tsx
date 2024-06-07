import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => {
    return (
        <div>
            <div>
                <h1 className="text-red-500 p-5">This is the landing page!</h1>
            </div>
            <div className={"d-flex justify-content-around pb-5"}>
                <Link to = "/home" className={"btn btn-primary btn-lg px-5"}>Home</Link>
                <Link to = "/document" className={"btn btn-primary btn-lg px-5"}>Document</Link>
            </div>
        </div>
    );
}

export default LandingPage;