import React, { useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ThemeProvider,styled, alpha, createTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { AuthContext } from "../App";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f0a8ab",
    },
    common: {
      white: "#fff",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,    
      sm: 600,   
      md: 960,   
      lg: 1280,  
    },
  },
});

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#275c5e",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

function SearchBar({ onChange }) {
  const searchInputRef = useRef(null);

  return (
    <ThemeProvider theme={theme}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search for Products.."
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => onChange(e)}
          inputRef={searchInputRef}
        />
      </Search>
    </ThemeProvider>

  );
}

export default function HomeNavbar({ onNewComponentOpen }) {
  const {
    setBrand, setCategories, setSubCategory, setIsSearched,
    setModifiedProducts } = React.useContext(AuthContext);


  const user = JSON.parse(localStorage.getItem("user"));
  let isAdmin = false;
  if (user != null) isAdmin = user.userType === "ADMIN";


  const [searchString, setSearchString] = useState("");
  const isInitialRender = useRef(true);

  const fetchData = async (keyWord) => {
    const urlSearch = "http://localhost:8080/products/search/" + keyWord;

    try {
      const response = await axios.get(urlSearch);
      const modifiedProducts = response.data;
      if (response.status === 200) {
        setModifiedProducts(modifiedProducts);
        if (Array.isArray(modifiedProducts) && modifiedProducts.length > 0) {
          const brands = modifiedProducts.map((product) => product.productBrand);
          const categories = modifiedProducts.map((product) => product.productCategory);
          const subcategories = modifiedProducts.map((product) => product.productSubCategory);

          setCategories([...new Set(categories)]);
          setSubCategory([...new Set(subcategories)]);
          setBrand([...new Set(brands)]);
        }
      }
    } catch (error) {
      if (error.response.status === 404) {
        console.error("Error 404: Product not found");
        setModifiedProducts([]);
        setBrand([]);
        setCategories([]);
        setSubCategory([]);
      } else {
        // Handle other errors
        console.error("Error fetching products:", error);
      }
    }
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return; // Skip the fetch on initial render
    }

    // Fetch data here
    if (searchString !== "") {
      fetchData(searchString);
      setIsSearched(true);
    } else if (searchString === "") {
      setModifiedProducts([]);
      setIsSearched(false);
    }
  }, [searchString]);

  const functiones = (e) => {
    console.log(e.target.value);
    console.log(searchString)
    if (e.target.value != searchString)
      setSearchString(e.target.value)
  }
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#f0a8ab" }}>
        <Toolbar>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{ marginLeft: "10px", marginRight: "auto", color: "red" }}
            href="/"
          >
            EKart
          </Button>
          <SearchBar onChange={(e) => functiones(e)} />
          <Button sx={{ marginLeft: "16px" }} onClick={onNewComponentOpen}>
            <AccountCircleIcon />
            Profile
          </Button>
          {!isAdmin && (<Button sx={{ marginLeft: "16px" }} href="/user_cart">
            <ShoppingCartIcon />
            Cart
          </Button>)}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
