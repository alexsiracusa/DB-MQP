import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../styles/TopNavBar.css";

const TopNavBar = () => {
    return (
        <>
            <Navbar expand="md" sticky="top" className={"pl-5 pr-2 navbar-custom"}>
                <Navbar.Brand href="/">Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/document">Document</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default TopNavBar;