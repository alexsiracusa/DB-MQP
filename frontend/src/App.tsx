import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import Translator from './components/Translator';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/translator" element={<Translator />} />
      </Routes>
    </Router>
  );
}

export default App
