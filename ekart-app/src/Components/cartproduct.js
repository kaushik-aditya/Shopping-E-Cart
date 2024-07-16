import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import CartProductsTemplate from "./cartproducttemplate";
import { Button, Box, IconButton } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

export default function CartProducts() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [cartData, setCartData] = useState({});
  const [isOrdered, setIsOrdered] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchCartData = async () => {
    const url = `http://localhost:8080/cart/${userId}/getCart`;

    try {
      const response = await Axios.get(url, config);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching cart data: " + error.message);
    }
  };
  const fetchData = async () => {
    try {
      const cartData = await fetchCartData();
      console.log(cartData)
      setCartData(cartData);
    } catch (error) {
      console.error(error);
    }
  };

  // Inside your component, you can use the fetchCartData function
  useEffect(() => {
    
    fetchData();
  }, []);

  const alterSelected = (currentCartProduct, checked) => {
    if (!checked) {
      const currentIndex = selectedItems.findIndex(
        (e) => e.cartProductId === currentCartProduct.cartProductId
      );
      const newSelected = [...selectedItems];
      if (currentIndex === -1) {
        console.log("not found");
        newSelected.push(currentCartProduct);
      } else {
        newSelected.splice(currentIndex, 1);
      }
      setSelectedItems(newSelected);
    } else {
      const currentIndex = selectedItems.findIndex(
        (e) => e.cartProductId === currentCartProduct.cartProductId
      );
      const newSelected = [...selectedItems];
      newSelected.splice(currentIndex, 1);
      newSelected.push(currentCartProduct);
      setSelectedItems(newSelected);
    }
  };

  const alterItem = (item) => {
    const currentIndex = cartData.cartProducts.findIndex(
      (e) => e.cartProductId === item.cartProductId
    );
    let products = cartData.cartProducts;
    products.splice(currentIndex, 1, item);
    let obj = {
      ...cartData,
      cartProducts: products,
    };
    setCartData(obj);
    alterSelected(item, true);
  };
  const deleteCartProduct = (currentCartProduct) =>{
    //if presenet in selecteditem 
    const currentIndexInSelected = selectedItems.findIndex(
      (e) => e.cartProductId === currentCartProduct.cartProductId
    );

    if(currentIndexInSelected!==-1){
      const newSelected = [...selectedItems];
      newSelected.splice(currentIndexInSelected, 1);
      setSelectedItems(newSelected);
    }
    const currentIndex = cartData.cartProducts.findIndex(
      (e) => e.cartProductId === currentCartProduct.cartProductId
    );
  
    let updatedCartProducts = [...cartData.cartProducts];
  
    updatedCartProducts.splice(currentIndex, 1);
  
    const updatedCartData = {
      ...cartData,
      cartProducts: updatedCartProducts,
    };
  
    setCartData(updatedCartData);
  }

  const calcTotal = () => {
    let tot = selectedItems.reduce((total, product) => {
      // Assuming each product has a property "productPrice"
      return total + product.product.productPrice * product.quantity;
    }, 0);
    setTotalPrice(tot);
  };

  useEffect(() => {
    calcTotal();
  }, [selectedItems]);

  const orederSelectedProducts = () => {
    const orderUrl = "http://localhost:8080/order/" + userId + "/createOrder";
    if (Array.isArray(selectedItems) && selectedItems.length > 0) {
      axios
        .post(orderUrl, selectedItems, config)
        .then((response) => {
          console.log("Order created successfully:", response.data);
          if (response.status === 200) {
            setIsOrdered(true);
          }
        })

        .catch((error) => {
          // Handle error

          console.error("Error creating order:", error);
          // You can display an error message to the user
        });
    }
    else {
      alert("Select Products to Ordere")
    }
  };

  useEffect(() => {
    console.log(isOrdered)
    fetchData();
  }, [isOrdered])


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ flexGrow: 1, marginTop: "15px" }}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Item>
            <Grid container spacing={2}>
              {isOrdered && (
                <Typography sx={{ marginTop: "20px", fontSize: "1.2rem" }}>
                  <CheckCircleOutlineIcon fontSize="large" sx={{ color: "green" }} /> Product has been Ordered!!
                </Typography>
              )}
              {cartData.cartProducts && Array.isArray(cartData.cartProducts) && cartData.cartProducts.length > 0 ? (
                cartData.cartProducts.map((cartProduct) => (
                  <Grid item xs={12} key={cartProduct.cartProductId}>
                    <Paper elevation={3}>
                      <CartProductsTemplate
                        cartProducts={cartProduct}
                        selectedItems={selectedItems}
                        setSelectedItems={alterSelected}
                        alterItem={alterItem}
                        deleteCartProduct={deleteCartProduct}
                      />
                    </Paper>
                  </Grid>
                
                ))) : (
                <Typography variant="h6" sx={{ marginLeft: "30px", marginTop: "20px" }}>
                  Your cart is empty!
                </Typography>
              )}
            </Grid>
          </Item>
        </Grid>

        <Grid xs={4}>
          <Item>
            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
              Pricing :
              {selectedItems.length > 0 && ` (${selectedItems.length} Items)`}
            </Typography>

            <Divider sx={{ color: "Blue", marginBottom: "10px" }} />
            <Typography variant="h6">
              Total Price : Rs{totalPrice}
            </Typography>
            <Button
              onClick={() => orederSelectedProducts()}
              variant="contained"
              sx={{ backgroundColor: "#007bff", color: "#fff", marginTop: "1rem" }}
            >
              Order
            </Button>
            <IconButton
              onClick={() => setSelectedItems([])}
              sx={{ marginTop: "1rem", color: "#dc3545" }}
            >
              <CancelIcon />
            </IconButton>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

