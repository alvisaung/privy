import { Snackbar, Alert } from "@mui/material";

import React, { FC, createContext, useState } from "react";
import { ProviderProps } from "./AuthProvider";

export const enum SnackType {
  "error" = "error",
  "warning" = "warning",
  "info" = "info",
  "success" = "success",
}

export const SnackBarContext = createContext({
  showSnackbar: (message: string, severity?: SnackType) => {},
});

export const SnackBarProvider: FC<ProviderProps> = ({ children }) => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: SnackType.success });
  const { open, message, severity } = snackbar;

  const showSnackbar = (message: string, severity: SnackType = SnackType.success) => {
    setSnackbar({ message, open: true, severity });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <SnackBarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert elevation={6} severity={severity} variant="filled" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
};

export default SnackBarContext;
