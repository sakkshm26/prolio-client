import { Box } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <Box>
      This is Home page!
      <NavLink to="/signup">Get started with signing up</NavLink>
    </Box>
  );
};

export default Home;
