import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "black", color: "white", mt: 12 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ py: 4 }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h4" gutterBottom>
              {`Privy Kitchen`}
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus est sed ultricies dignissim.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h4" gutterBottom>
              Links
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              <Link href="#">About Us</Link>
              <br />
              <Link href="#">Contact Us</Link>
              <br />
              <Link href="#">Privacy Policy</Link>
              <br />
              <Link href="#">Terms & Conditions</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              Address: 123 Main Street, City, State ZIP
              <br />
              Phone: (123) 456-7890
              <br />
              Email: info@chefskitchen.com
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ pb: 2 }}>
          © {new Date().getFullYear()} {`Privy Kitchen`}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
