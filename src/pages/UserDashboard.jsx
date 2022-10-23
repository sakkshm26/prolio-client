import {
  Box,
  FormControl,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../auth/useAuth";
import logo from "../ui/logo.png";
import AddProfile from "./AddProfile";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState(null);
  console.log(userData);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      API.get(`/user/${user?.result?.username}`, {
        params: {
          token: user?.token,
        },
      })
        .then((res) => {
          setUserData(res?.data?.user);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } 
  }, []);

  return (
    <Box>
      {loading ? (
        <Box className="loading"></Box>
      ) : (
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            position="sticky"
            top={0}
            id="navbar"
            // sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <Box component="img" src={logo} sx={{ height: 70, width: 80 }} />
          </Box>
          {userData?.profiles?.length ? (
            <Box>
              <Typography
                textAlign="center"
                marginTop={5}
                fontSize={18}
                onClick={() => navigate(`/${userData.username}`)}
                sx={{
                  textTransform: "none",
                  textDecoration: "none",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Go to {userData.name}'s profile
                <NavigateNextIcon sx={{ fontSize: 40 }} />
              </Typography>
            </Box>
          ) : (
            <AddProfile />
          )}
        </Box>
      )}
    </Box>
  );
};

export default UserDashboard;
