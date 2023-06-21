import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from "react-router-dom";
import { Button } from "@mui/material";
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import './App.css';

function App() {
    const [selected, setSelected] = useState("en");
    const [user, setUser] = useState(null);
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setSelected(lng);
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if(user) setUser(JSON.parse(user));
    }, []);

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
                <Route path="/home" element={<Home />} />
                <Route path="/" element={user ? <Home /> : <Register />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
            </Routes>
        </div>
    );
}

export default App;
