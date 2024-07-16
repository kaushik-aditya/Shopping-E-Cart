
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function LoginPage({ settoken, setuser }) {
  localStorage.clear("user");
  localStorage.clear("token");

  const [errorMessage, setErrorMessage] = useState("");
  const { logIn,setIsloggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const loginUser = (api, requestData) => {
    const basicUrl = "http://localhost:8080";
    const url = basicUrl + api;

    // Define the request headers
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .post(url, requestData, { headers })
      .then((response) => {
        // Handle a successful response
        const token = response.data.jwttoken;
        const user = response.data.user;
        
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        logIn();
        navigate("/");
      })
      .catch((error) => {
        // Handle errors
        if (error.response) {
          // The request was made and the server responded with a status code outside the range of 2xx
          console.error(
            "Request failed with status code:",
            error.response.status
          );
          console.error("Response data:", error.response.data);
          setErrorMessage("Invalid email or password. Please try again."); // Customize the message
        } else if (error.request) {
          // The request was made but no response was received
          console.error(
            "No response received. The request may have timed out."
          );
        } else {
          // Something happened in setting up the request
          console.error("Error:", error.message);
        }
      });
  };

  const handleInputChange = (event) => {
    setErrorMessage(false);

    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginUser("/login", user);
  };
  // function Copyright(props) {
  //   return (
  //     <Typography variant="body2" color="text.secondary" align="center" {...props}>
  //       {'Copyright © '}
  //       <Link color="inherit" href="https://mui.com/">
  //         Your Website
  //       </Link>{' '}
  //       {new Date().getFullYear()}
  //       {'.'}
  //     </Typography>
  //   );
  // }
  
  // TODO remove, this demo shouldn't need to reset the theme.
  
  const defaultTheme = createTheme();

  return (
   
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              autoFocus
              value = {user.password}
              onChange={handleInputChange}
            />
            {errorMessage && <div className="text-danger">{errorMessage}</div>}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign_in" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
