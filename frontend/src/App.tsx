import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import Home from './components/Home';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App
