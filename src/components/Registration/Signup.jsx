/* import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import { AuthContext } from "../../auth/useAuth";

const Signup = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/${user?.result?.username}`);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting this", formData);

    await API.post("/user/signup", formData)
      .then((res) => {
        console.log("Signup data ", res?.data);
        localStorage.setItem("profile", JSON.stringify({ ...res?.data }));
        navigate(`/${user?.result?.username}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <input name="name" placeholder="Name" type="string" required={true} />
        <input name="username" placeholder="Username" type="string" required={true} />
        <input name="email" placeholder="Email" type="email" required={true} />
        <input name="password" placeholder="Password" type="password" required={true} />
        <input
          name="confirm_password"
          placeholder="Confirm password"
          type="password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup; */

import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOpen from "@mui/icons-material/LockOpen";
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
        borderColor: "#0dffda",
      },
    },
  },
})(TextField);

const theme = createTheme();

export default function SignInSide() {
  const { user } = useContext(AuthContext);

  const [emailError, setEmailError] = useState(null)
  const [usernameError, setUsernameError] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/user-dashboard`);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting this", formData);

    await API.post("/user/signup", formData)
      .then((res) => {
        console.log("Signup data ", res?.data);
        localStorage.setItem("profile", JSON.stringify({ ...res?.data }));
        navigate(`/user-dashboard`);
      })
      .catch((err) => {
        if (err?.response?.data?.code === 1) {
          setEmailError(err.response.data.message)
          setUsernameError(null)
        } else if(err?.response?.data?.code === 2) {
          setEmailError(null)
          setUsernameError(err.response.data.message)
        }
        console.log(err)
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
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
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ backgroundColor: "black" }}
        >
          <Box
            sx={{
              my: { xs: 3, md: "10%" },
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOpen />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: "#fff" }}>
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              onChange={handleChange}
              sx={{ mt: 1 }}
            >
              <InputTextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
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
              <InputTextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
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
              {usernameError && <Typography color="#b62828">{usernameError}</Typography>}
              <InputTextField
                margin="normal"
                required
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
              {emailError && <Typography color="#b62828">{emailError}</Typography>}
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
              <InputTextField
                margin="normal"
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#072c50" }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    href="/login"
                    variant="body2"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography sx={{ color: "#424242" }}>
                      Already have an account? Login
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
