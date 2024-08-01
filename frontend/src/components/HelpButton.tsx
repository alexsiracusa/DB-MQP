import React from 'react';
import { useNavigate } from 'react-router-dom';
import HelpIcon from "../assets/Icons/HelpIcon.svg"
import '../styles/MenuButton.css'

//<img src={HelpIcon} alt="Help" className="menu-button" />

const HelpButton: React.FC = () => {

const navigate = useNavigate();
  
const handleNavigation = (path: string) => {
  navigate(path);
};


    return(
        <div className='menu-button'>
        <button onClick={() => handleNavigation('/help')} className="menu-button" title="Help">
      ?
    </button>
    </div>
    );
}

export default HelpButton;