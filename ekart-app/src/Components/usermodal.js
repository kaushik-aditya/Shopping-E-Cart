import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%", // Set the width to 80% of the viewport
    maxHeight: "80vh", // Set the maximum height for scrollability
    overflowY: "auto", // Enable vertical scrolling if content overflows
    backgroundColor: "rgba(255, 187, 126, 0.8)", // Background color for the modal
    border: "2px solid #000",
    boxShadow: "24px",
};

const formStyle = {
    padding: "50px", // Add padding for the form
};

const submitButtonStyle = {
    marginTop: "16px",
    width : "60%",
    
};

export default function UserModal({ open = false, onClose, onSubmit }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [hasChanged, setHasChanged] = useState(false);

    const [formData, setFormData] = useState({
        userName: user.userName || "",
        userEmail: user.userEmail || "",
        userPhoneNumber: user.userPhoneNumber || "",
        userAddress: {
            city: user.userAddress?.city || "",
            state: user.userAddress?.state || "",
            street: user.userAddress?.street || "",
            pincode: user.userAddress?.pincode || "",
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHasChanged(true);

        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData({
                ...formData,
                [parent]: {
                    ...formData[parent],
                    [child]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (hasChanged) {
            const updatedFormData = {
                ...formData,
                userId: user.userId,
                userType: user.userType,
            };
            onSubmit(updatedFormData);
        }
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box style={modalStyle}>

                <div style={formStyle}>
                    <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                        Edit User
                    </Typography>
                    {Object.keys(formData).map((field) => (
                        <div key={field}>
                            {typeof formData[field] === "object" ? (
                                <div >
                                    {Object.keys(formData[field]).map((addressField) => (
                                        <TextField
                                            key={addressField}
                                            name={`userAddress.${addressField}`}
                                            label={addressField}
                                            value={formData[field][addressField]}
                                            onChange={handleChange}
                                            fullWidth
                                            margin="normal"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <TextField
                                    key={field}
                                    name={field}
                                    label={field.substring(4)}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                        </div>
                    ))}
                    <Button
                        style={submitButtonStyle}
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>

            </Box>
        </Modal>
    );
}
