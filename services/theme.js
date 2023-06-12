import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f44336", // change this to your desired color,
    },
    secondary: {
      main: "#36b8f4",
    },
    warning: {
      main: "#f44336",
    },
    grey: {
      main: "#f44336",
    },
  },

  typography: {
    fontSize: 16,
    color: "black",
    fontFamily: `"ProximaRegular", sans-serif`,
    // spacing: 12,
    h1: {
      fontSize: "36px",
      fontWeight: 500,
    },
    h2: {
      fontSize: "30px",
      fontWeight: 500,
    },
    h3: {
      fontSize: "24px",
      fontWeight: 500,
    },
    h4: {
      fontSize: "20px",
      fontWeight: 500,
    },
    h5: {
      fontSize: "18px",
      fontWeight: 500,
    },
    h6: {
      fontSize: "16px",
      fontWeight: 500,
    },
    body1: {
      fontSize: "18px",
      fontWeight: 400,
    },
    body2: {
      fontSize: "16px",
      fontWeight: 400,
      letterSpacing: 0.5,
    },
    button: {
      fontSize: "1rem",
      fontWeight: 500,
      textTransform: "none",
    },
  },
});
export default theme;
