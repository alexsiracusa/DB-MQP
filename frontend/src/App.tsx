import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import TopNavBar from "./components/TopNavBar";
import Translator from './components/Translator';
import LandingPage from './components/LandingPage';
import Document from "./components/Document";

function App() {
  return (
      <>
      <Navbar />
        <TopNavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/translator" element={<Translator />} />
          <Route path="/document" element={<Document />} />
      </Routes>
      </>
  );
}

export default App
