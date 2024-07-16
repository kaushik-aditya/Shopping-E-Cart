import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Card, CardMedia, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "../App";

export default function ProductPreOrder() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();


    const user = JSON.parse(localStorage.getItem("user"));
    let isAdmin = false;
    if (user != null) isAdmin = user.userType === "ADMIN";
    const isLoggedIn = user != null;

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const location = useLocation();
    const productId = location.state.productId;

    const [product, setProduct] = useState({});

    const url = "http://localhost:8080/products/getById/" + productId;
    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                if (response.status === 200) {
                    const fetchedProduct = response.data;
                    setProduct(fetchedProduct);
                } else {
                    console.error("Request failed with status:", response.status);
                }
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
            });
    }, []);

    const addProductInCart = async () => {
        if (!isLoggedIn) {
            console.log("harsh chutioya");
            navigate("/log_in");
        }
        else {
            const  userId  = user ? user.userId : null;
            const url =
                "http://localhost:8080/cart/" + userId + "/add/" + product.productId;

            await axios
                .get(url, config)
                .then((response) => {
                    if (response.status === 200) {
                        // Product added to cart successfully
                        alert("Product added to cart");
                        console.log(response.data);

                    } else {
                        // Handle other status codes or errors if needed
                        console.error("Request failed with status:", response.status);
                    }
                })
                .catch((error) => {
                    // Handle network errors or other exceptions
                    console.error("Error adding product to cart:", error);
                    // You can also display an error message to the user if needed
                });
        }
    };

    return (
        <Card style={{ display: "flex", justifyContent: "space-around" }}>
            <CardMedia
                component="img"
                alt={product.productName}
                sx={{

                    height: "300px",
                    width: "300px",
                }}
                image={`data:image/jpeg;base64,${product.productPic}`}
            />
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    {product.productName}
                </Typography>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    {product.productBrand}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Rs {product.productPrice}
                </Typography>
                <Typography variant="body1" paragraph>
                    {product.productDetails}
                </Typography>
                {!isAdmin && <Button
                    variant="contained"
                    color="primary"
                    onClick={addProductInCart}
                    style={{
                        transition: "background 0.3s",
                        "&:hover": { background: "lightblue" },
                    }}
                >
                    Add to Bag
                </Button>}
            </CardContent>
        </Card>
    );
}
