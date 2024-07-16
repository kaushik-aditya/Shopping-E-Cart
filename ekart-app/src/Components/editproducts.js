import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Container } from "react-bootstrap";
import ProductModal from "./productmodal";
import { useNavigate } from "react-router-dom";
export default function EditProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(null); // list of all products
  const token = localStorage.getItem("token");

  const getProducts = async () => {
    try {
      const url = "http://localhost:8080/products/getAllProducts";
      const response = await axios.get(url);

      if (response.status === 200) {
        // Assuming the response contains the products data
        const products = response.data;
        return products;
      } else {
        // Handle other status codes or errors if needed
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error fetching products:", error);
      throw error;
    }
  };
  const fetchProducts = async () => {
    try {
      const newProducts = await getProducts();
      console.log(newProducts);
      setProducts(newProducts);
    } catch (error) {
      // Handle the error appropriately
      console.error("Error fetching products:", error);
    }
  };

  // Use useEffect to fetch products only once when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  const openProductPreview = (product) => {
    navigate(`/product_preview`, { state: { product } });
  };

  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openProductEdit = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };
  const closeProductEdit = () => {
    setIsProductModalOpen(false);
  };
  const handleProductUpdateFormSubmit = async (formData) => {
    console.log(formData);
    // changing in database
    try {
      // Send the formData to the "updateprofile" URL using an HTTP POST request
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Specify the Content-Type as needed
        },
      };
      const response = await axios.post(
        "http://localhost:8080/products/update",
        formData,
        config
      );

      if (response.status === 201) {
        fetchProducts();
      } else {
        // Handle other status codes or errors if needed
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error submitting form data:", error);
      // You can also display an error message to the user if needed
    }
  };

  return (
    <>
      {isProductModalOpen && (
        <ProductModal
          open={isProductModalOpen}
          onClose={closeProductEdit}
          onSubmit={handleProductUpdateFormSubmit}
          product={selectedProduct}
        />
      )}
      <Container fluid m={2} p={2}>
        <Button
          sx={{ marginTop: "25px", width: 200 }}
          variant="contained"
          href="/add_product"
        >
          Add Product
        </Button>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {products &&
            products.map((product, index) => (
              <React.Fragment key={product.productId}>
                <ListItem
                  key={product.productId}
                  alignItems="flex-start"
                  onClick={() => openProductPreview(product)}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={product.productName}
                      src={`data:image/jpeg;base64,${product.productPic}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.productName}
                    secondary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {product.productDetails}
                      </Typography>
                    }
                  />
                </ListItem>
                <Button
                  sx={{ marginLeft: "10px" }}
                  variant="outlined"
                  onClick={() => openProductEdit(product)}
                >
                  Edit
                </Button>
                
                {index !== products.length - 1 && (
                  <Divider
                    sx={{ marginTop: "10px", marginBottom: "15px" }}
                    variant="inset"
                    component="li"
                  />
                )}
              </React.Fragment>
            ))}
        </List>
      </Container>
    </>
  );
}
