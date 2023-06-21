import { useState, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getUser } from '../utils';
import { Box, Button, FormControl, TextField, Input, Typography } from '@mui/material';

const NewTask = forwardRef(({onCreateTask, onCloseModal }, ref) => {
    const [formData, setFormData] = useState({
        title: "",
        endDate: "",
        image: "",
        related_user: getUser().id,
    });

    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("title", formData.title);
        form.append("end_date", formData.endDate);
        form.append("image", formData.image);
        form.append("related_user", formData.related_user);

        onCreateTask(form);
        onCloseModal();
    };

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.files ? e.target.files[0] : e.target.value,
        });
      };

    return (
        <Box className="form-box">
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                {t("form.newTask")}
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl margin='normal' fullWidth>
                    <TextField
                        name="title"
                        label={t("form.title")}
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        variant='outlined'
                        required
                    />
                </FormControl>
                <FormControl margin='normal' fullWidth>
                    <TextField
                        name="endDate"
                        label={t("form.endDate")}
                        type="date"
                        value={formData.endDate}
                        onChange={handleChange}
                        variant='outlined'
                        InputLabelProps={{ shrink: true }}
                    />
                </FormControl>
                <FormControl margin='normal' fullWidth sx={{ mb: 2 }}>
                    <Input
                        id="file-input"
                        name="image"
                        type="file"
                        onChange={handleChange}
                    />
                </FormControl>
                <Button type="submit" variant="contained">
                    {t("form.submit")}
                </Button>
                <Button onClick={onCloseModal}>
                    {t("form.cancel")}
                </Button>
            </form>
        </Box>
    );
});

export default NewTask;