import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSignup = () => {
        const signupurl = "http://localhost:8080/signup";
        axios.post(signupurl, formData)
            .then(response => {
                // Handle success
                console.log('Signup successful:', response.data);
                navigate("/log_in");
                
            })
            .catch(error => {
                // Handle error
                console.error('Error during signup:', error);
                // You can display an error message to the user
            });

    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Signup
                </Typography>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Enter Name"
                                variant="outlined"
                                name="userName"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Enter Email Address"
                                variant="outlined"
                                name="userEmail"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Enter Password"
                                variant="outlined"
                                type="password"
                                name="userPassword"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        
                        
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSignup}
                        style={{ marginTop: '20px' }}
                    >
                        Sign Up
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
