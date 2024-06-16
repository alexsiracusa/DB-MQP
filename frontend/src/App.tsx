import {Route, Routes} from 'react-router-dom';
import './styles/App.css'

import Translator from './pages/Translator.tsx';
import TranslatorMockup from "./pages/TranslatorMockup.tsx";
import LandingPage from './pages/LandingPage.tsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/translator" element={<Translator/>}/>
            <Route path="/mockup" element={<TranslatorMockup/>}/>
        </Routes>
    );
}

export default App
