import { Container, Button, Typography, Divider, CssBaseline } from "@mui/material";
import { useContext } from "react";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { AuthContext } from "../App";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Box } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function UserTools({ onNewComponentClose, openUserModal }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { isLoggedIn } = useContext(AuthContext);
  let isAdmin = false;
  if (user != null) isAdmin = user.userType === "ADMIN";

  const componentStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white", // Set background color
    borderRadius: "8px", // Add rounded corners
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
  };

  const buttonStyles = {
    textTransform: "none",
    color: "#000", // Set text color to black
    fontWeight: "normal",
  };

  return (
    <Container  >
      <CssBaseline />
      <Button
        color="secondary"
        aria-label="close"
        onClick={onNewComponentClose}
        sx={buttonStyles}
      >
        <CloseIcon />
      </Button>
      {!isLoggedIn ? (
        <Container style={componentStyle} >
          <Typography variant="h5" mb={2} sx={{ fontSize: '1.5rem', textAlign: 'left' }}>
            Welcome to Ekart.
          </Typography>
          <Divider color="secondary" />
          <Grid mt={2} mb={1}>
            <Grid item md={12}>
              <Typography sx={{ fontSize: '1.2rem', textAlign: 'left' }}>New User?</Typography>
              <Button href="/sign_in" sx={buttonStyles}>
                <PersonAddAltRoundedIcon />
                Sign Up
              </Button>
            </Grid>
          </Grid>
          <Divider color="secondary" />
          <Grid mt={2} mb={1}>
            <Grid item md={12}>
              <Typography sx={{ fontSize: '1.2rem', textAlign: 'left' }}>Already Have an account?</Typography>
              <Button href="/log_in" sx={buttonStyles}>
                <LoginIcon />
                Log In
              </Button>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Container style={componentStyle} >
          <Typography mt={1} mb={1} sx={{ fontSize: '1.2rem', textAlign: 'left' }}>
            Hello {user.userName}
          </Typography>
          <Typography mt={1} mb={1} sx={{ fontSize: '1rem', textAlign: 'left' }}>
            {user.userPhoneNumber}
          </Typography>
          <Divider color="secondary" />

          {!isAdmin && <Button mt={1} href="/order_details" sx={buttonStyles}>
            Your Orders
          </Button>}

          {isAdmin && (
            <Button mt={1} href="/all_products" sx={buttonStyles}>
              Products
            </Button>
          )}
          {!isAdmin && <Button variant="text" onClick={openUserModal} sx={buttonStyles}>
            Update Profile
          </Button>}
          <Button href="/log_in" sx={buttonStyles}>
            Log In Another Account
          </Button>
          <Button href="/sign_in" sx={buttonStyles}>
            <PersonAddAltRoundedIcon />
            Sign Up
          </Button>
          <Button href="/log_out" sx={buttonStyles}>
            <ExitToAppIcon />
            Log Out
          </Button>
        </Container>
      )}
      <Divider color="secondary" />
    </Container>
  );

}
