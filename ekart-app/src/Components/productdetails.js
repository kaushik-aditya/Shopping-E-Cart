import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { Container, Typography, Grid, CardMedia, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function ProductDetails() {
  const { isFiltered,
    filteredProducts, setIsFiltered,
    isSearched, modifiedProducts,
    setCategories, setSubCategory, setBrand } = useContext(AuthContext);

  

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const productsPerPage = 9; // Number of products to show per page

  // Calculate the index range for the products to display on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;


  const paginate = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    // Recalculate currentProducts whenever the list of products changes
    const newCurrentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    setCurrentProducts(newCurrentProducts);
  }, [products, currentPage]);



  const getProducts = async () => {
    try {
      const url = "http://localhost:8080/products/getAllProducts";
      const response = await axios.get(url);

      if (response.status === 200) {
        const products = response.data;
        return products;
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const fetchProducts = async () => {
    try {
      const newProducts = await getProducts();
      setCurrentProducts(products.slice(indexOfFirstProduct, indexOfLastProduct));
      if (Array.isArray(newProducts) && newProducts.length > 0) {
        const brands = newProducts.map((product) => product.productBrand);
        const categories = newProducts.map((product) => product.productCategory);
        const subcategories = newProducts.map((product) => product.productSubCategory);

        setCategories([...new Set(categories)]);
        setSubCategory([...new Set(subcategories)]);
        setBrand([...new Set(brands)]);

      }
      setProducts(newProducts);
    } catch (error) {

      console.error("Error fetching products:", error);
    }
  };

  // when the component mounts,
  // fetch all products

  useEffect(() => {
    if (isInitialMount.current) {
      fetchProducts();

    }
    else {
      return;
    }
  }, []);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (isFiltered && !isSearched) {

        setProducts(filteredProducts);
        setCurrentPage(1);
      }

      if (isSearched && !isFiltered) {
        setProducts(modifiedProducts);
        setCurrentPage(1);
      }

      else if (isSearched && isFiltered) {
        const updatedProducts = filteredProducts.filter(productA =>
          modifiedProducts.some(productB => productA.productId === productB.productId)
        );
        if (Array.isArray(updatedProducts) && updatedProducts.length > 0) {
          const brands = updatedProducts.map((product) => product.productBrand);
          const categories = updatedProducts.map((product) => product.productCategory);
          const subcategories = updatedProducts.map((product) => product.productSubCategory);

          setCategories([...new Set(categories)]);
          setSubCategory([...new Set(subcategories)]);
          setBrand([...new Set(brands)]);

        }
        else if (Array.isArray(updatedProducts) && updatedProducts.length === 0) {
          setCategories([]);
          setSubCategory([]);
          setBrand([]);
        }
        setCurrentPage(1);
        setProducts(updatedProducts);
      }
      else if (!isFiltered && !isSearched) {
        fetchProducts();
        setCurrentPage(1);
      }
    }



  }, [isFiltered, filteredProducts, isSearched, modifiedProducts]);


  const showProductDetails = (productId) => {
    navigate(`/product_cart`, { state: { productId } });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center the content horizontally
      }}
    >
      <Grid container spacing={2}>
        {Array.isArray(currentProducts) && currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                style={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // Center the content vertically
                  backgroundColor: "rgba(192,192,192,0.2)", // Grayish background color
                }}
                onClick={() => showProductDetails(product.productId)}
              >
                <CardMedia
                  sx={{ height: "150px", width: "175px" }}
                  component="img"
                  alt={product.productName}
                  image={`data:image/jpeg;base64,${product.productPic}`}
                />

                <Typography variant="body1" style={{
                  marginTop: "10px", paddingLeft: "10px"
                }}>
                  {product.productName}
                </Typography>
                <Typography variant="h6" style={{
                  paddingLeft: "10px"
                }}>
                  Rs {product.productPrice}
                </Typography>
              </Card>
            </Grid>
          ))
        ) : (
          isSearched ? (
            <Typography sx={{ marginTop: "50px" }} variant="h3">No Products to Show</Typography>
          ) : (
            <Typography sx={{ marginTop: "50px" }} variant="h3">No Products to Show</Typography>
          )
        )}
      </Grid>
      <Stack spacing={2} sx={{ marginTop: "40px", marginLeft: "auto", marginRight: "auto" }}>
        <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          page={currentPage}
          onChange={paginate}
          variant="outlined"
        />
      </Stack>
    </Container>


  );
}
