import {Route, Routes} from 'react-router-dom';
import './styles/App.css'

import Translator from './pages/Translator.tsx';
import TranslatorMockup from "./pages/TranslatorMockup.tsx";
import HomePage from './pages/HomePage.tsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/translator" element={<Translator/>}/>
            <Route path="/mockup" element={<TranslatorMockup/>}/>
        </Routes>
    );
}

export default App
