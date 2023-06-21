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
import { registerUser  } from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerUser(formData);
            if(res.message === "Invalid email address") setError(t("registerErrors.invalidEmail"))
            else if(res.message === "Email already exists") setError(t("registerErrors.existingEmail"))
            else if(res.message === "Username already exists") setError(t("registerErrors.existingUsername"))
            else navigate("/login");
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
                    {t("registerForm.title")}
                </Typography>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <FormControl margin="normal" fullWidth>
                        <TextField
                            name="username"
                            label={t("registerForm.username")}
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <TextField
                            name="email"
                            label={t("registerForm.email")}
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <TextField
                            name="password"
                            label={t("registerForm.password")}
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
                        {t("registerForm.submit")}
                    </Button>
                    <Link href="/login" variant="body2" sx={{ textDecoration: "none" }}>
                        {t("registerForm.login")}
                    </Link>
                </form>
            </div>
            {error && <Typography sx={{ color: "red" }}>{error}.</Typography>}
        </Container>
    );
};

export default Register;