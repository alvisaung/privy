import { Box, Typography, TextField, Button } from "@mui/material";
import React, { ChangeEvent, ChangeEventHandler, FC, FormEvent, FormEventHandler, useContext, useEffect, useState } from "react";
import ChefApiService from "@/services/api/ChefApiService";
import Link from "next/link";
import SnackBarContext from "@/utils/Context/SnackBarProvider";
import { AuthContext } from "@/utils/Context/AuthProvider";
import { Router, useRouter } from "next/router";
import withBeforeAuth from "@/services/HOC/beforeAuth";
import LocalStorage from "@/services/storage/LocalStorage";

interface LoginProps {
  register_link: string;
}

const LoginComponent: FC<LoginProps> = ({ register_link }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showSnackbar } = useContext(SnackBarContext);
  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  const handleEmailChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    const user = LocalStorage.getUser();
    if (user) {
      router.replace("/");
    }
  }, []);
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ChefApiService.ChefLogin(email, password, showSnackbar).then((user) => {
      if (!user) return;
      setUser(user);
      router.push("/chef");
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "80vh", justifyContent: "center" }}>
      <Box
        sx={{
          background: "white",
          borderRadius: "10px",
          padding: { xs: 2, sm: 5 },
          margin: "auto",
          width: { xs: "90%", md: "50%" },
        }}
      >
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
          <img src="/imgs/logo.png" width={100} height={100} alt="Logo" style={{ margin: "auto" }} />

          <Typography variant="h3" gutterBottom sx={{ mt: 2 }}>
            Log in as Chef
          </Typography>
          <TextField required label="Email" variant="outlined" value={email || ""} onChange={handleEmailChange} fullWidth margin="normal" />
          <TextField required label="Password" variant="outlined" value={password || ""} onChange={handlePasswordChange} fullWidth margin="normal" type="password" />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 4, textAlign: "center" }} // center the button
          >
            Log In
          </Button>
        </form>
        <Typography mt={2}>
          {`Don't have account yet? `}
          <Link href={register_link}>Register</Link>
        </Typography>
      </Box>
    </div>
  );
};

export default LoginComponent;
