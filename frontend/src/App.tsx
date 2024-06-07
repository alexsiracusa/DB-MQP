import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css'

import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Document from "./components/Document";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
          <Route path="/document" element={<Document />} />
      </Routes>
    </Router>
  );
}

export default App
