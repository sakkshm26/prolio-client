import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { withStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../ui/logo.png";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShareIcon from "@mui/icons-material/Share";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import "./About.css";
import example from "../ui/example.png";
import API from "../api";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#e3e3e3",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#07655e",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#07655e",
        borderWidth: 1,
        borderRadius: "5px 0 0 1px",
      },
      "&:hover fieldset": {
        borderColor: "#07655e",
        borderWidth: 1,
        borderRadius: "5px 0 0 1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#07655e",
        borderWidth: 1,
        borderRadius: "5px 0 0 1px",
      },
    },
  },
})(TextField);

const drawerWidth = 240;

const About = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", backgroundColor: "black", height: "100vh" }}
    >
      <List>
        <Typography
          color="#e3e3e3"
          sx={{ textDecoration: "none", textTransform: "none" }}
          margin="20px 20px"
        >
          <NavLink to="/" style={{ color: "#e3e3e3", textDecoration: "none" }}>
            Login
          </NavLink>
        </Typography>
        <Typography
          color="#e3e3e3"
          sx={{ textDecoration: "none", textTransform: "none" }}
          margin="20px 20px"
        >
          <NavLink to="/" style={{ color: "#e3e3e3", textDecoration: "none" }}>
            Sign Up
          </NavLink>
        </Typography>
        <Typography
          color="#e3e3e3"
          sx={{
            textDecoration: "none",
            textTransform: "none",
            "&:hover": { cursor: "pointer" },
          }}
          margin="20px 20px"
          onClick={() => document.getElementById("claim-link").focus()}
        >
          Get Started
        </Typography>
        <Typography
          color="#e3e3e3"
          sx={{ textDecoration: "none", textTransform: "none" }}
          margin="20px 20px"
          onClick={() => (window.location = `mailto:app.prolio@gmail.com`)}
        >
          Contact us
        </Typography>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 15) {
      document.getElementById("navbar")?.classList.add("nav-light");
      document.getElementById("navbar")?.classList.remove("nav-dark");
    } else {
      document.getElementById("navbar")?.classList.add("nav-dark");
      document.getElementById("navbar")?.classList.remove("nav-light");
    }
  };

  /* useEffect(() => {
    API.get('http://localhost:4000/test').then(res => console.log(res.data)).catch(err => console.log(err))
  }, []); */

  return (
    <Box textAlign="center" paddingBottom={5}>
      <Box>
        <Box
          display="flex"
          justifyContent="center"
          position="sticky"
          top={0}
          id="navbar"
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <Typography
            color="#e3e3e3"
            sx={{ textDecoration: "none", textTransform: "none" }}
            margin="20px 20px"
          >
            <NavLink
              to="/"
              style={{ color: "#e3e3e3", textDecoration: "none" }}
            >
              Login
            </NavLink>
          </Typography>
          <Typography
            color="#e3e3e3"
            sx={{ textDecoration: "none", textTransform: "none" }}
            margin="20px 20px"
          >
            <NavLink
              to="/"
              style={{ color: "#e3e3e3", textDecoration: "none" }}
            >
              Sign Up
            </NavLink>
          </Typography>
          <Box component="img" src={logo} sx={{ height: 70, width: 80 }} />
          <Typography
            color="#e3e3e3"
            sx={{
              textDecoration: "none",
              textTransform: "none",
              "&:hover": { cursor: "pointer" },
            }}
            margin="20px 20px"
            onClick={() => document.getElementById("claim-link").focus()}
          >
            Get Started
          </Typography>
          <Typography
            color="#e3e3e3"
            sx={{
              textDecoration: "none",
              textTransform: "none",
              "&:hover": { cursor: "pointer" },
            }}
            margin="20px 20px"
            onClick={() => (window.location = `mailto:app.prolio@gmail.com`)}
          >
            Contact us
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={logo}
            sx={{ height: 70, width: 80 }}
            marginLeft={2}
          />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Typography fontSize={{ xs: 30, md: 40 }} margin="50px 0 60px 0">
        Create your portfolio within minutes
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom={{ xs: 10, sm: 15 }}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            color="#e3e3e3"
            marginRight={1}
            fontSize={{ xs: 15, sm: 19 }}
          >
            app.prolio.xyz/
          </Typography>
          <CssTextField
            placeholder="username"
            sx={{
              input: { color: "#e3e3e3", fontSize: { xs: 13, sm: 17 } },
              "& input": { padding: "10px 10px" },
            }}
            id="claim-link"
          />
        </Box>
        <Button
          sx={{
            border: "1px solid #0c5f59",
            padding: "9px",
            borderRadius: { xs: 1, sm: "0 5px 5px 0" },
            color: "#e3e3e3",
            textTransform: "none",
            backgroundColor: "#07655e",
            marginTop: { xs: 3, sm: 0 },
            fontSize: { xs: 12, sm: 15 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Claim Link
        </Button>
      </Box>
      <Box
        component="img"
        src={example}
        height={{ xs: "400px", sm: "600px", md: "800px" }}
        width={{ xs: "95%", sm: "85%", md: "60%" }}
        boxShadow="0px 0px 24px -10px #15c8bb"
        borderRadius={3}
        marginBottom={10}
      />
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        marginBottom={{xs: 6, md: 13}}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box
          boxShadow="0px 0px 24px -8px #15c8bb"
          borderRadius="10px"
          width={{ xs: "80%", md: "20%" }}
          height={100}
          padding={{ xs: "15px", md: "20px" }}
          margin={{ xs: "15px 0", md: 0 }}
        >
          <PersonAddIcon sx={{ color: "#e3e3e3", fontSize: 30 }} />
          <Typography margin="20px 0 20px 0" fontSize={18}>
            Connect your social media accounts easily
          </Typography>
        </Box>
        <Box
          boxShadow="0px 0px 24px -8px #15c8bb"
          borderRadius="10px"
          width={{ xs: "80%", md: "20%" }}
          height={100}
          padding={{ xs: "15px", md: "20px" }}
          margin={{ xs: "15px 0", md: 0 }}
        >
          <ShareIcon sx={{ color: "#e3e3e3", fontSize: 30 }} />
          <Typography margin="20px 0 20px 0" fontSize={18}>
            Showcase and share your profile
          </Typography>
        </Box>
        <Box
          boxShadow="0px 0px 24px -8px #15c8bb"
          borderRadius="10px"
          width={{ xs: "80%", md: "20%" }}
          height={100}
          padding={{ xs: "15px", md: "20px" }}
          margin={{ xs: "15px 0", md: 0 }}
        >
          <PersonSearchIcon sx={{ color: "#e3e3e3", fontSize: 30 }} />
          <Typography margin="20px 0 20px 0" fontSize={18}>
            Help brands find you easily
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography fontSize={30} color="#e3e3e3">
          More coming <span className="rgb">soon!</span>
        </Typography>
      </Box>
      <Box marginTop={8}>
        <Typography>
          Contact us at{" "}
          <Box
            component="span"
            onClick={() => (window.location = `mailto:app.prolio@gmail.com`)}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            app.prolio@gmail.com
          </Box>
        </Typography>
        <Typography>© 2022 Prolio</Typography>
      </Box>
    </Box>
  );
};

export default About;
