import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar: React.FC = () => {

  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

    return(
      <nav className="flex items-center bg-blue-800 p-3 flex-wrap">
      <a href="#" className="p-2 mr-4 inline-flex items-center">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-current text-white h-8 w-8 mr-2"
        >
          <image href="\src\assets\Icons\NavbarStack.png" x="0" y="0" height="24" width="24" />
        </svg>
        <span className="text-xl text-white font-bold uppercase tracking-wide" onClick={() => handleNavigation('/')}
          >Relational Remodel MQP</span>
      </a>

      <div
        className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
        id="navigation"
      >
        <div
          className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto"
        >
          <a
            href="#"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            
            <span onClick={() => handleNavigation('/Translator')}>Translator</span>
          </a>
          <a
            href="#"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            <span>Documentation</span>
          </a>
          <a
            href="#"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            <span>Contact Us</span>
          </a>
        </div>
      </div>
    </nav>
    )
}

export default Navbar;