import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import prolio from "../../ui/logo2.png";
import { withStyles } from "@mui/styles";
import { AuthContext } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import API from "../../api";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Prolio
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const InputTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#0cc6aa",
      },
    },
  },
})(TextField);

const theme = createTheme();

export default function Login() {
  const { user } = useContext(AuthContext);

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/user-dashboard`);
    }
  }, []);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting this", formData);

    await API.post("/user/signin", formData)
      .then((res) => {
        console.log("Login data ", res?.data);
        localStorage.setItem(
          "profile",
          JSON.stringify({ token: res.data.token, profile: res.data.user })
        );
        navigate(`/user-dashboard`);
      })
      .catch((err) => {
        if (err?.response?.data?.code === 1) {
          setEmailError(err.response.data.message);
          setPasswordError(null);
        }
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", justifyContent: "center" }}
      >
        {/* <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${prolio})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        /> */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ background: "linear-gradient(rgb(26 2 2), rgb(4 2 27))" }}
        >
          <Box
            sx={{
              my: { xs: 3, md: "25%" },
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LoginIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: "#fff" }}>
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              onChange={handleChange}
              sx={{ mt: 1, width: "100%" }}
            >
              <InputTextField
                margin="normal"
                required={true}
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="off"
                autoFocus
                sx={{
                  color: "white",
                  backgroundColor: "#1b1b1b",
                  input: { color: "#fff" },
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
              />
              {emailError && (
                <Typography color="#b62828">{emailError}</Typography>
              )}
              <InputTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                sx={{
                  color: "white",
                  backgroundColor: "#1b1b1b",
                  input: { color: "#fff" },
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
              />
              {passwordError && (
                <Typography color="#b62828">{passwordError}</Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, fontWeight: "600", backgroundColor: "#081430", '&:hover': {backgroundColor: "#081430"} }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    href="/signup"
                    variant="body2"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography sx={{ color: "#686868" }}>
                      Don't have an account? Sign Up
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
