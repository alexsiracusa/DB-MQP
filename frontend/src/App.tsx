import {Route, Routes} from 'react-router-dom';
import './styles/App.css'

import Document from './pages/Document.tsx';
import TranslatorPage from "./pages/TranslatorPage.tsx";
import HomePage from './pages/HomePage.tsx';
import HelpPage from './pages/HelpPage.tsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/translator" element={<TranslatorPage/>}/>
            <Route path="/documentation" element={<Document/>}/>
            <Route path="/help" element={<HelpPage/>}/>
        </Routes>
    );
}

export default App
