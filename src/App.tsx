import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./Main/Config/MaterialUIConfig";
import { ToastContainer } from "react-toastify";
import { useGlobalContext } from "./GlobalContext";
import RoutersApp from "./Main/Routes/Routers";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const { state } = useGlobalContext();
  const [mode, setMode] = useState(state?.mode === "dark" ? darkTheme : lightTheme);

  useEffect(() => {
    setMode(state?.mode === "dark" ? darkTheme : lightTheme );
  }, [state]);

  return (
    <>
      <ThemeProvider theme={mode}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <BrowserRouter>
            <RoutersApp />
          </BrowserRouter>
          <ToastContainer />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
