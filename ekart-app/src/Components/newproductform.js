
import React, { useContext, useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { AuthContext } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input } from '@mui/material';

const initialProductData = {
    productBrand: '',
    productCategory: '',
    productDetails: '',
    productName: '',
    productPrice: '',
    productSubCategory: '',

};

export default function NewProductForm() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    let productPic = null;

    const [productData, setProductData] = useState(initialProductData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8080/products/addProduct';
        
        let formData = new FormData();
        formData.append('productBrand', productData.productBrand);
        formData.append('productCategory', productData.productCategory);
        formData.append('productDetails', productData.productDetails);
        formData.append('productName', productData.productName);
        formData.append('productPrice', productData.productPrice);
        formData.append('productSubCategory', productData.productSubCategory);
        formData.append('productPic', productPic); // Append the image

    
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Use multipart/form-data for file upload
                },
            });
            if (response.status === 201) {
                navigate("/all_products");
            }
        } catch (error) {
            // Handle any errors
            console.error('Error sending product data:', error);
        }
    
        console.log('Product Data:', productData);
    };


    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            productPic = selectedImage;
        }


    };
    const formComponent = {
        margin: "30px",
        padding: "10px",
        backgroundColor: "#dcefee",  // You can choose any color you prefer
        borderRadius: "10px",  // Add rounded corners for a better look
        display: "flex",
        flexDirection: "column", // Stack children vertically
        alignItems: "center",    // Center horizontally
        justifyContent: "center"

    };

    return (
        <Row>
            <Col md={2}></Col>
            <Col md={6}>
                <form style={formComponent} onSubmit={handleSubmit}>
                    <Typography variant="h5" >Add Product</Typography>
                    {Object.keys(productData).map((key) => (
                        <TextField
                            key={key}
                            name={key}
                            label={key.substring(7)}
                            value={productData[key]}
                            onChange={handleChange}

                            variant="outlined"
                            margin="normal"
                            style={{ width: "70%" }}
                        />
                    ))}
                    <Input
                        type="file"
                        accept="image/*"
                        name="productPic"
                        sx={{ marginTop: "20px", marginBottom: "20px" }}
                        onChange={handleImageChange}
                    />
                    <Button type="submit" variant="contained" color="primary" style={{ width: "60%" }}>
                        Submit
                    </Button>
                </form>
            </Col>
            <Col md={4}>

            </Col>
        </Row>

    );
}
