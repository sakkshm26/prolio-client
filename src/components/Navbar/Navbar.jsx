import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import decode from 'jwt-decode'
import { AuthContext } from "../../auth/useAuth";
import { Box, Button, Typography } from "@mui/material";
import logo from "../../ui/logo.png"

const Navbar = ({toggleDrawer, isOwner, userData}) => {

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: {xs: 0, md: "0 10%"} }}>
      <img src={logo} alt="Not found" style={{ height: 54, width: 70 }} />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {userData?.profiles[0]?.socials?.twitterProfile?.length ? <Typography sx={{ margin: 3, textDecoration: 'none', display: {xs: "none", sm: "block"} }}><a href="#twitter-section" style={{ textDecoration: 'none', textTransform: 'none', color: 'white' }}>Twitter</a></Typography> : null}
        {userData?.profiles[0]?.socials?.youtubeChannel?.length ? <Typography sx={{ margin: 3, textDecoration: 'none', display: {xs: "none", sm: "block"} }}><a href="#youtube-section" style={{ textDecoration: 'none', textTransform: 'none', color: 'white' }}>Youtube</a></Typography> : null}
        {isOwner &&  <Button sx={{ textTransform: "none", fontSize: {xs: 13, sm: 14}, margin: {xs: "10px 0",sm: 3}, padding: 0, color: "#0dffda", border: "1px solid #0dffda" }} onClick={toggleDrawer}>Edit</Button>}
      </Box>
    </Box>
  );
};

export default Navbar;
