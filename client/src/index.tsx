import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/useAuth";
import { createTheme, ThemeProvider } from "@mui/material";
// import { ThemeProvider } from "@mui/styles";

const THEME = createTheme({
  typography: {
    allVariants: {
      fontFamily: `'Rubik', sans-serif`,
      fontSize: 14,
      color: "white"
      // fontWeightRegular: 400,
      // fontWeightMedium: 500,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
      <ThemeProvider theme={THEME}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
