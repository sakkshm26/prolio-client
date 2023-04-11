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
import { Loading } from "../components/Loading";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      let data = JSON.parse(localStorage.getItem("profile"))
      if (data) {
        API.get(`/user/get`, {
          params: {
            token: data.token,
          },
        })
          .then((res) => {
            setUserData(res?.data?.user);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }
    }, 2000);
  }, []);

  return (
    <Box>
      {loading ? (
        <Loading />
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
              {userData.profiles.map((profile, index) => (
                <Box
                  key={index}
                  onClick={() => navigate(`/${profile.username}`)}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <Typography
                    textAlign="center"
                    marginTop={5}
                    fontSize={18}
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
              ))}
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
