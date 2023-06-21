import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Avatar,
    Button,
    TextField,
    Link,
    Typography,
    Container,
    FormControl,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { loginUser  } from '../services/api';

const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(formData);
            if(res.message === "Invalid username or password") setError(t("loginForm.error"))
            if(res.user) {
                // stores user data in local storage to keep user logged in
                localStorage.setItem("user", JSON.stringify(res.user));
                setUser(res.user);
                navigate("/home");
            };
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className="auth-container">
                <Avatar className="avatar">
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t("loginForm.title")}
                </Typography>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <FormControl margin="normal" fullWidth>
                        <TextField
                            name="username"
                            label={t("loginForm.username")}
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <TextField
                            name="password"
                            label={t("loginForm.password")}
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {t("loginForm.submit")}
                    </Button>
                    <Link href="/register" variant="body2" sx={{ textDecoration: "none" }}>
                        {t("loginForm.register")}
                    </Link>
                </form>
            </div>
            {error && <Typography sx={{ color: "red" }}>{error}.</Typography>}
        </Container>
    );
};

export default Login;