import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import theme from "@/services/theme";
import NavBar from "@/components/NavBar";
import { SnackBarProvider } from "@/utils/Context/SnackBarProvider";
import AuthProvider from "@/utils/Context/AuthProvider";
import { Box } from "@mui/material";
import Footer from "@/components/Footer";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";

const ContentWrapper = {
  flexGrow: 1,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SnackBarProvider>
            <AuthProvider>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                }}
              >
                <div style={ContentWrapper}>
                  <NavBar />
                  <Component {...pageProps} />
                </div>
                <Footer />
              </div>
            </AuthProvider>
          </SnackBarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </Box>
  );
}
