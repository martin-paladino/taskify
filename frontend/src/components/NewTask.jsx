import { useState } from 'react';
import { Box, Button, FormControl, TextField, Input, InputLabel } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const NewTask = ({onCreateTask, onCloseModal }) => {
    const [formData, setFormData] = useState({
        title: "",
        endDate: "",
        image: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("title", formData.title);
        form.append("end_date", formData.endDate);
        form.append("image", formData.image);

        onCreateTask(form);
        onCloseModal();
    };

    const handleChange = (e) => {
        if(e.target.files) console.log("file", e.target.files[0])
        setFormData({
          ...formData,
          [e.target.name]: e.target.files ? e.target.files[0] : e.target.value,
        });
      };

    return (
        <Box sx={style}>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <TextField
                        name="title"
                        label="Title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        variant='outlined'
                        required
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        name="endDate"
                        label="End Date"
                        type="date"
                        value={formData.endDate}
                        onChange={handleChange}
                        variant='outlined'
                        InputLabelProps={{ shrink: true }}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel htmlFor="file-input">Image</InputLabel>
                    <Input
                        id="file-input"
                        name="image"
                        type="file"
                        onChange={handleChange}
                    />
                </FormControl>
                <Button type="submit" variant="contained">
                    Submit
                </Button>
                <Button onClick={onCloseModal}>
                    Cancel
                </Button>
            </form>
        </Box>
    );
};

export default NewTask;