import { Box, Typography, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useContext, useState } from "react";
import ChefApi from "@/services/api/chef_api";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ChefApiService from "@/services/api/ChefApiService";
import SnackBarContext from "@/utils/Context/SnackBarProvider";
import { useRouter } from "next/router";
import Image from "next/image";
import { AuthContext } from "@/utils/Context/AuthProvider";

interface RegisterProps {
  login_link: string;
}

const RegisterComponent = ({ login_link }: RegisterProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const { showSnackbar } = useContext(SnackBarContext);
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ChefApiService.ChefRegister(data, showSnackbar).then((user) => {
      if (!user) return;
      setUser(user);
      router.push("/chef");
    });
    // Handle login logic here
  };

  const { email, name, password } = data;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "80vh", justifyContent: "center" }}>
      <Box
        sx={{
          // border: "1px solid rgb(157, 155, 155)",
          background: "white",
          borderRadius: "10px",
          padding: { xs: 2, sm: 3 },
          margin: "auto",
          mt: { xs: 2, sm: "auto" },
          width: { xs: "90%", md: "50%" },
        }}
      >
        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column" }}>
          <Image src="/imgs/logo.png" width={100} height={100} alt="Logo" style={{ margin: "auto" }} />

          <Typography variant="h2" gutterBottom sx={{ mt: 2 }}>
            Register
          </Typography>
          <TextField required label="Name" name="name" variant="outlined" value={name} onChange={handleChange} fullWidth margin="normal" />
          <TextField required label="Email" name="email" variant="outlined" value={email} onChange={handleChange} fullWidth margin="normal" />
          <TextField
            required
            label="Password"
            name="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            value={password}
            onChange={handleChange}
            margin="normal"
            type={showPassword ? "text" : "password"}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, textAlign: "center" }} // center the button
          >
            Register
          </Button>
        </form>
        <Typography mt={2}>
          {`Already have an account? `}
          <Link href={login_link}>Log In</Link>
        </Typography>
      </Box>
    </div>
  );
};

export default RegisterComponent;
