import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function ProductModal({ open = false, onClose, onSubmit, product }) {
    const [hasChanged, setHasChanged] = useState(false);
    const [formData, setFormData] = useState({ ...product });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHasChanged(true);

        // Update the form data with the new value
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (hasChanged) {
            onSubmit(formData);
        }
        onClose();
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'rgb(255, 77, 77,0.5)',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        width: 800,
        height: 800,
        overflow: 'auto',
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h3" sx={{ margin: 'auto' }}>
                    Edit Product
                </Typography>
                {Object.keys(formData).map((field) => (
                    !(field === "tags" || field === "productPic") && (
                        <TextField
                            key={field}
                            name={field}
                            label={field}
                            id="outlined-disabled"

                            value={formData[field]}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />)
                ))}
                <Button
                    variant="outlined"
                    sx={{ display: "block", width: "40%", marginBottom: "20px" }}
                    component="label"
                >
                    Upload Image File
                    <input
                        type="file"
                        hidden
                    />
                </Button>
                <Button variant="contained" onClick={handleSubmit} sx={{ display: "block" }}
                >
                    Submit
                </Button>
            </Box>
        </Modal>
    );
}
