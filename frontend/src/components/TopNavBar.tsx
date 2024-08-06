import "../styles/TopNavBar.css";
import Logo from "../assets/Icons/NavbarStack.png";
import {useNavigate} from 'react-router-dom';


const TopNavBar = () => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <nav className="nav-container">
            <div
                className="logo"
                onClick={() => handleNavigation('/')}
            >
                <img src={Logo}/>
                Relational Remodel
            </div>

            <div className="links">
                <span onClick={() => handleNavigation('/translator')}>Translator</span>
                <span onClick={() => handleNavigation('/documentation')}>Documentation</span>
                <span onClick={() => handleNavigation('/help')}>Help</span>
            </div>
        </nav>
    )
}

export default TopNavBar;