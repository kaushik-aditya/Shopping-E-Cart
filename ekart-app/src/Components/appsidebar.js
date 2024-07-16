import React, { useEffect } from "react";
import {
    Container,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Checkbox,
    Divider,
    Button,
} from "@mui/material";
import { AuthContext } from "../App";
import { TextField } from "@mui/material";
import axios from "axios";

export default function AppSideBar() {
    const { setIsFiltered,
        brand, setBrand,
        category, subcategory,
        setCategories, setSubCategory,
        setFilteredProducts } = React.useContext(AuthContext);

    const [selectedCategories, setSelectedCategories] = React.useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = React.useState([]);
    const [selectedBrands, setSelectedBrands] = React.useState([]);
    const [minSelectedPrice, setMinSelectedPrice] = React.useState(null); 
    const [maxSelectedPrice, setMaxSelectedPrice] = React.useState(null);
    const handleToggle = (value, setSelectedFunction) => {
        setSelectedFunction((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((item) => item !== value);
            } else {
                return [...prevSelected, value];
            }
        });
    };


    const findProducts = () => {
        const filterTags = {
            categories: selectedCategories,
            subcategories: selectedSubcategories,
            brand: selectedBrands,
            minPrice: minSelectedPrice,
            maxPrice: maxSelectedPrice,
        };
        if (filterTags !== null) setIsFiltered(true);

        const URL = "http://localhost:8080/products/filteredProducts";

        axios
            .post(URL, filterTags)
            .then((response) => {
                // Handle a successful response (status code 200)
                const filteredProducts = response.data;
                setFilteredProducts(filteredProducts);
                if (Array.isArray(filteredProducts) && filteredProducts.length > 0) {
                    const brands = filteredProducts.map((product) => product.productBrand);
                    const categories = filteredProducts.map((product) => product.productCategory);
                    const subcategories = filteredProducts.map((product) => product.productSubCategory);

                    setCategories([...new Set(categories)]); // Remove duplicates if any
                    setSubCategory([...new Set(subcategories)]);
                    setBrand([...new Set(brands)]);
                    setIsFiltered(true);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    setFilteredProducts([]);
                    setIsFiltered(true);
                    console.error("Resource not found:", error);
                } else {
                    // Handle other errors
                    console.error("Error while fetching filtered products:", error);
                }
            });
    };

    const sidebarStyle = {
        backgroundColor: "lightblue",
        height: "30em",
        display: "flex",
        flexDirection: "column",
        justifyContent : 'space-between'        
    };

    return (
        <Container fluid sx={{ marginTop: "20px" }}>
            <div sx={sidebarStyle} >
                <List>
                    <h6>Categories</h6>
                    {Array.isArray(category) &&
                        category.length > 0 &&
                        category.map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton
                                    onClick={() => handleToggle(text, setSelectedCategories)}
                                >
                                    <Checkbox checked={selectedCategories.includes(text)} />
                                    <ListItemText primary={text} color="Blue" />
                                </ListItemButton>
                                <Divider />
                            </ListItem>
                        ))}
                </List>
                <Divider sx={{ backgroundColor: "red" }} />
                <List>
                    <h6>Subcategory</h6>
                    {Array.isArray(subcategory) &&
                        subcategory.length > 0 &&
                        subcategory.map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton
                                    onClick={() => handleToggle(text, setSelectedSubcategories)}
                                >
                                    <Checkbox checked={selectedSubcategories.includes(text)} />
                                    <ListItemText primary={text} color="Blue" />
                                </ListItemButton>
                                <Divider />
                            </ListItem>
                        ))}
                </List>
                <Divider sx={{ backgroundColor: "red" }} />
                <List>
                    <h6>Brand</h6>
                    {Array.isArray(brand) &&
                        brand.length > 0 &&
                        brand.map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton
                                    onClick={() => handleToggle(text, setSelectedBrands)}
                                >
                                    <Checkbox checked={selectedBrands.includes(text)} />
                                    <ListItemText primary={text} color="Blue" />
                                </ListItemButton>
                                <Divider />
                            </ListItem>
                        ))}
                </List>
                <Divider sx={{ backgroundColor: "red", marginBottom: "20px" }} />

                <TextField
                    label="Min Price"
                    type="number"
                    value={minSelectedPrice}
                    onChange={(e) => setMinSelectedPrice(e.target.value)}
                />
                <TextField
                    label="Max Price"
                    type="number"
                    value={maxSelectedPrice}
                    onChange={(e) => setMaxSelectedPrice(e.target.value)}
                />

                <Button
                    variant="contained"
                    sx={{
                        width: "100%",
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    onClick={findProducts}
                >
                    Find Products
                </Button>
            </div>
        </Container>
    );
}
