import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "../services/api";
import { getUser } from "../utils";
import { Button, IconButton, Box, AppBar, Toolbar, Typography, Tooltip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = ({ setSelectedFilter }) => {
    const [selected, setSelected] = useState("all");

    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleButtonClick = (value) => {
        setSelected(value);
        setSelectedFilter(value);
    };

    const handleLogout = () => {
        logoutUser();
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <AppBar position="static">
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Taskify
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                    <Button
                        color="inherit"
                        variant={selected === "all" ? "contained" : "text"}
                        onClick={() => handleButtonClick("all")}
                    >
                        {t("filters.all")}
                    </Button>
                    <Button
                        color="inherit"
                        variant={selected === "completed" ? "contained" : "text"}
                        onClick={() => handleButtonClick("completed")}
                    >
                        {t("filters.completed")}
                    </Button>
                    <Button
                        color="inherit"
                        variant={selected === "pending" ? "contained" : "text"}
                        onClick={() => handleButtonClick("pending")}
                    >
                        {t("filters.pending")}
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ mr: 1 }}>
                        {t("welcome")}{getUser()?.username}
                    </Typography>
                    <Tooltip title={t("logout")}>
                        <IconButton color="inherit" onClick={handleLogout}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                    </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;