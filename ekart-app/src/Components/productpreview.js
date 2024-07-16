import React from "react";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function ProductPreview() {
    const location = useLocation();

    // Access the product object from the state
    const product = location.state.product;
    console.log(product)
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

            </CardContent>
        </Card>
    );
}
