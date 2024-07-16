import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createContext, useState, useEffect } from 'react';

import HomeNavbar from './Components/appbar';
import UserTools from './Components/usertools';
import PageRoutes from './Components/routes';
import { Grid, Box } from '@mui/material';
import UserModal from './Components/usermodal';
import axios from 'axios';
import { keyframes } from '@mui/material';
import styled from '@mui/material';



export const AuthContext = createContext();

export default function App() {

  console.log("app updated");

  const [modifiedProducts, setModifiedProducts] = useState([]);
  const [filteredProducts,setFilteredProducts] = useState([]);
  const [isFiltered,setIsFiltered] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const [category, setCategories] = useState([]);
  const [subcategory,setSubCategory] = useState([]);
  const [brand, setBrand] = useState([]);

  const currentToken = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${currentToken}`,
    },
  };

  const [isLoggedIn, setIsloggedIn] = useState(false);
  const logIn = () => setIsloggedIn(true);
  const logOut = () => setIsloggedIn(false);

  useEffect(() => {

    if (currentToken) {

      setIsloggedIn(true);
    }
  }, [currentToken]);

  const [isUserToolsComponentVisible, setIsUserToolsComponentVisible] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Function to open the new component
  const openUserDetailsComponent = () => {
    setIsUserToolsComponentVisible(true);
  };
  const closeUserDetailsComponent = () => {
    setIsUserToolsComponentVisible(false);
  };

  const openUserModal = () => {
    setIsUserModalOpen(true);
  }
  const closeUserModal = () => {
    setIsUserModalOpen(false);
  }
  const handleUserUpdateFormSubmit = async (formData) => {
    console.log(formData);
    // changing in database
    try {
      // Send the formData to the "updateprofile" URL using an HTTP POST request

      const response = await axios.post('http://localhost:8080/updateProfile', formData, config);

      if (response.status === 201) {
        console.log(formData);
        localStorage.setItem("user", JSON.stringify(formData));

      } else {
        // Handle other status codes or errors if needed
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error submitting form data:', error);
      // You can also display an error message to the user if needed
    }
  };
  const appStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "rgba(122, 145, 162, 0.2)",
    filter: "blur(5px)", // Apply the blur effect
    transition: "filter 0.3s ease", // Add a smooth transition
  };


  return (
    <AuthContext.Provider
      value={
        {
          isLoggedIn,
          logIn,
          logOut,
          brand, setBrand,
          modifiedProducts,setModifiedProducts,
          category, setCategories, 
          subcategory,setSubCategory,
          isFiltered,setIsFiltered,
          filteredProducts,setFilteredProducts,
          isSearched, setIsSearched
        }}>
      <Box
        sx={{
          ...appStyle, // Apply the background blur style
          filter: isUserModalOpen ? "blur(5px)" : "none", // Conditionally apply blur
        }}>
        {isUserModalOpen && (
          <UserModal open={isUserModalOpen} onClose={closeUserModal} onSubmit={handleUserUpdateFormSubmit} />
        )}

        <HomeNavbar onNewComponentOpen={openUserDetailsComponent} />
        {isUserToolsComponentVisible ? (
          <Grid container >
            <Grid item md={3}>
              <UserTools onNewComponentClose={closeUserDetailsComponent} openUserModal={openUserModal} />
            </Grid>
            <Grid item md={9}>
              <PageRoutes mt={2} p={2} logOut={logOut} />
            </Grid>

          </Grid>
        ) : (
          <PageRoutes mt={2} p={2} logOut={logOut} />
        )}

      </Box>
    </AuthContext.Provider>
  );
}

