import ChefApiService from "@/services/api/ChefApiService";
import { ChefUser, User } from "@/services/types/general";
import { AuthContext } from "@/utils/Context/AuthProvider";
import SnackBarContext from "@/utils/Context/SnackBarProvider";
import { Avatar, Button, Container, Input, TextField, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useState } from "react";

interface Pro {
  profile: ChefUser;
}
const Edit: FC<Pro> = ({ profile }) => {
  const [profileData, setProfileData] = useState<ChefUser>({
    profile_url: "",
    name: "",
    address: "",
    phone: "",
    about_me: "",
  });

  const { showSnackbar } = useContext(SnackBarContext);

  // const router = useRouter();

  const { user } = useContext(AuthContext);
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    let res = await ChefApiService.GetProfile();
    console.log(res);
    setProfileData(res);
  };

  useEffect(() => {
    if (user) {
      const { address, about_me, name, phone, profile_url } = user;
      setProfileData({ name: name, about_me: about_me, address: address, phone: phone, profile_url: profile_url });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    const data = ChefApiService.EditProfile(profileData);
    if (!data) return;
    showSnackbar("Profile Upload Success.");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData((prevData) => ({
        ...prevData,
        avatar: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Head>
        <title>Edit Profile</title>
      </Head>
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Typography variant="h2">Edit Profile</Typography>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" id="image-upload-button" style={{ display: "none" }} onChange={handleAvatarChange} />
          <label htmlFor="image-upload-button">
            <Avatar src={profileData.profile_url} sx={{ width: 100, height: 100, m: "auto", mb: 2 }}>
              A
            </Avatar>
          </label>
          <TextField required name="name" label="Restaurant Name" value={profileData.name} onChange={handleInputChange} fullWidth margin="normal" />
          <TextField name="address" label="Address" value={profileData.address ?? ""} onChange={handleInputChange} fullWidth margin="normal" />
          <TextField required name="phone" label="Phone" value={profileData.phone ?? ""} onChange={handleInputChange} fullWidth margin="normal" />
          <TextField required name="about_me" label="About my restaurant" value={profileData.about_me ?? ""} onChange={handleInputChange} fullWidth margin="normal" multiline rows={4} />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            <Typography>Save Changes</Typography>
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Edit;
