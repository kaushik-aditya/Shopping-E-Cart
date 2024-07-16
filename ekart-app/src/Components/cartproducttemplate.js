import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Checkbox,
    ListItem,
    ListItemText,
    FormControlLabel,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
import axios from "axios";
import { Container } from "react-bootstrap";

export default function CartProductsTemplate({
    cartProducts,
    selectedItems,
    setSelectedItems,
    alterItem,
    deleteCartProduct,
}) {

    const [currentCartProduct, setCurrentCartProduct] = useState(
        JSON.parse(JSON.stringify(cartProducts))
    );

    const token = localStorage.getItem("token");
    const { userId } = JSON.parse(localStorage.getItem("user"));
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };


    const handleCheckboxToggle = (currentCartProduct) => {
        setSelectedItems(currentCartProduct, false);
    };

    const handleIncreaseQuantity = (currentCartProduct) => {
        const increaseUrl = `http://localhost:8080/cart/${userId}/changeQuantity/${currentCartProduct.product.productId}/increase`;

        // const currentIndex = selectedItems.findIndex(
        //     (e) => e.cartProductId === currentCartProduct.cartProductId
        // );

        // const isChecked = currentIndex !== -1;
        // console.log(isChecked)

        axios
            .get(increaseUrl, config)
            .then((response) => {
                alterItem(response.data, false);

            })
            .catch((error) => {
                console.error("Error increasing quantity:", error);
            });
    };

    const handleDecreaseQuantity = (currentCartProduct) => {
        const decreaseUrl = `http://localhost:8080/cart/${userId}/changeQuantity/${currentCartProduct.product.productId}/decrease`;

        if(currentCartProduct.quantity===1){
            handleDeleteCartProduct(currentCartProduct);
        }
        axios
            .get(decreaseUrl, config)
            .then((response) => {
                alterItem(response.data, false);

            })
            .catch((error) => {
                console.error("Error decreasing quantity:", error);
            });
    };
    const isCurrentlyChecked = selectedItems.some(
        (e) => e.cartProductId === currentCartProduct.cartProductId
    );

    const handleDeleteCartProduct = async (currentCartProduct) => {
        try {
          const productId = currentCartProduct.product.productId; 
          const response = await axios.delete(`http://localhost:8080/cart/${userId}/remove/${productId}`, config);
      
          // Check if the DELETE request was successful
          if (response.status === 200) {
            deleteCartProduct(currentCartProduct); // passing true for deleting condition
          } else {
            // Handle other status codes or errors if needed
            console.error(`Request failed with status ${response.status}`);
          }
        } catch (error) {
          // Handle network errors or other exceptions
          console.error('Error:', error);
          // You can also display an error message to the user if needed
        }
      };


    return (
        <Container>
            {currentCartProduct ? (
                <Card sx={{position:'relative'}}>
                    <CardContent>
                        <IconButton
                            onClick={() => handleDeleteCartProduct(currentCartProduct)}
                            sx={{ position: 'absolute', top: 0, left: 0, color: 'red' }}
                        >
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <ListItem key={currentCartProduct.cartProductId}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isCurrentlyChecked}
                                        onChange={() => handleCheckboxToggle(currentCartProduct)}
                                    />
                                }
                            />

                            <ListItemText
                                primary={currentCartProduct.product.productName}
                                secondary={`Price: Rs${currentCartProduct.product.productPrice}, Quantity: ${currentCartProduct.quantity}`}
                            />

                            <IconButton
                                onClick={() => handleIncreaseQuantity(currentCartProduct)}
                            >
                                <AddCircleOutlineIcon />
                            </IconButton>

                            <IconButton
                                onClick={() => handleDecreaseQuantity(currentCartProduct)}
                            >
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        </ListItem>
                    </CardContent>
                </Card>
            ) : null}
        </Container>
    );
}
