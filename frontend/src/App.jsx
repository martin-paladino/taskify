import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from "react-router-dom";
import { Button } from "@mui/material";
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import './App.css';

function App() {
    const [selected, setSelected] = useState("en");
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setSelected(lng);
    };

    return (
        <div>
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
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
