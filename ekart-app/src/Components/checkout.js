import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ProductCard = styled(Card)({
    maxWidth: 400,
    margin: '0 auto',
    marginTop: theme => theme.spacing(2),
});

const ProductImage = styled('img')({
    width: '100%',
    maxHeight: 200,
    objectFit: 'cover',
});

const ProductName = styled(Typography)({
    fontSize: 20,
    fontWeight: 'bold',
});

const ProductDescription = styled(Typography)({
    fontSize: 16,
    marginBottom: theme => theme.spacing(1),
});

const ProductPrice = styled(Typography)({
    fontSize: 18,
    fontWeight: 'bold',
});

const AddToCartButton = styled(Button)({
    marginTop: theme => theme.spacing(2),
});

const CheckOut = () => {
    

    return (
        <ProductCard>
            <ProductImage src="product-image.jpg" alt="Product" />
            <CardContent>
                <ProductName>Product Name</ProductName>
                <ProductDescription>Product Description goes here.</ProductDescription>
                <ProductPrice>$99.99</ProductPrice>
                <AddToCartButton variant="contained" color="primary" fullWidth>
                    Add to Cart
                </AddToCartButton>
            </CardContent>
        </ProductCard>
    );
};

export default CheckOut;
