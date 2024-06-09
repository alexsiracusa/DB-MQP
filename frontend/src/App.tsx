import { Route, Routes } from 'react-router-dom';
import './App.css'

import Translator from './components/Translator';
import LandingPage from './components/LandingPage';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/translator" element={<Translator />} />
      </Routes>
    
  );
}

export default App
