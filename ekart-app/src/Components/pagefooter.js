
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                EKart
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const footercomponent= {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "gray",
    padding: "20px" 
}

export default function PageFooter() {
    return (

        <Box 
            component="footer"
            // style={footercomponent} // Apply your custom CSS class here
        >
            <Container maxWidth="sm">
                
                <Copyright />
            </Container>
        </Box>

    );
}
