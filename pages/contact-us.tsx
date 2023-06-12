import { Call, Email, LocationCity, Room } from "@mui/icons-material";
import { Container, Typography, TextField, Button, Box, styled, Card, CardContent, Grid } from "@mui/material";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";

const ContactUsForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  marginTop: "32px",
});
const InfoBox = styled("div")({
  backgroundImage: "linear-gradient(to right, #c31432, #240b36);",
  padding: "10px 20px",
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  width: 250,
});

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData); // replace with API call to submit form data
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h2" align="center" sx={{ mt: 2, mb: 2 }}>
            Contact Us
          </Typography>

          <Typography variant="body1" sx={{ mb: 4 }}>
            {`We're always happy to hear from you. Please use the form below to send us a message, and we'll get back to you as soon as we can.`}
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"} sx={{ mt: 2, mb: 4 }}>
            <InfoBox>
              <Room sx={{ color: "white", fontSize: 22 }} />
              <Typography variant="body1" align="center" color="white">
                123 Main Street Singapore 12345
              </Typography>
            </InfoBox>
            <InfoBox>
              <Call sx={{ color: "white", fontSize: 22 }} />
              <Typography variant="body1" align="center" color="white">
                +65 1234 5678
              </Typography>
            </InfoBox>
            <InfoBox>
              <Email sx={{ color: "white", fontSize: 22 }} />
              <Typography variant="body1" align="center" color="white">
                contact@example.com
              </Typography>
            </InfoBox>
          </Box>

          <ContactUsForm onSubmit={handleSubmit} sx={{ mb: 4 }}>
            <TextField label="Name" name="name" value={formData.name} onChange={handleInputChange} required />
            <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            <TextField label="Message" rows={3} name="message" value={formData.message} onChange={handleInputChange} multiline required />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, width: "fit-content" }}>
              Send
            </Button>
          </ContactUsForm>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ContactUs;
