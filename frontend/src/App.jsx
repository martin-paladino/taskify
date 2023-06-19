import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@mui/material";
import Home from './pages/home';
import './App.css';

function App() {
    const [selected, setSelected] = useState("en");
    const { i18n } = useTranslation();
    
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setSelected(lng);
    };

    return (
        <div className="App">
            <div className="lang-buttons">
                <Button 
                    variant={selected === "en" ? "contained" : "text"}
                    onClick={() => changeLanguage('en')}
                    >EN</Button>
                <Button 
                    variant={selected === "es" ? "contained" : "text"}
                    onClick={() => changeLanguage('es')}
                    >ES</Button>
            </div>
            <Home />
        </div>
    );
}

export default App;
