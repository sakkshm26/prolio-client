import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import API from "../../api";
import { AuthContext } from "../../auth/useAuth";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Navbar } from "../Navbar";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import instagramIcon from "../../ui/instagram.png";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Card } from "../../molecules";
import { InstagramSection, TwitterSection, YoutubeSection } from "../../pages";
import Sidebar from "../Sidebar";
import FacebookSection from "../../pages/FacebookSection";

const Dashboard = () => {
  const { username } = useParams();
  const { user } = useContext(AuthContext);

  const [changedGeneralInfo, setChangedGeneralInfo] = useState(false);
  const [changedAccountInfo, setChangedAccountInfo] = useState(false);

  const [isOwner, setIsOwner] = useState(false);
  const [userData, setUserData] = useState(null);
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = () => {
    !drawerState ? setDrawerState(true) : setDrawerState(false);
  };

  /* const getUser = async () => {
    const username = JSON.parse(localStorage.getItem("profile"))?.result
      ?.username;
    await axios
      .get(`http://localhost:4000/user/${username}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }; */

  /* const handleTwitterClick = () => {
    let loginWindow = window.open(
      `http://localhost:4000/api/authentication/twitter/start/${user?.result?._id}`,
      "_blank",
      "height=600, width=600"
    );

    var timer = setInterval(function () {
      if (loginWindow.closed) {
        clearInterval(timer);
        getUser();
      }
    }, 1000);
  }; */

  useEffect(() => {
    console.log("Account info changed, have to refetch");
    async function getUser() {
      console.log("Fetching user");
      await API.get(`/user/${username}`, {
        params: {
          token: user?.token,
        },
      })
        .then((res) => {
          console.log(res.data);
          if (res.data?.owner === true) {
            setIsOwner(true);
          } else {
            setIsOwner(false);
          }
          setUserData(res?.data?.user);
        })
        .catch((err) => console.log(err));
      setChangedAccountInfo(false);
    }
    getUser();
  }, [changedAccountInfo]);

  return (
    <Box sx={{ padding: { xs: "1px 20px", md: "1px 150px" } }}>
      <Navbar
        toggleDrawer={toggleDrawer}
        isOwner={isOwner}
        userData={userData}
      />
      <Sidebar
        drawerState={drawerState}
        toggleDrawer={toggleDrawer}
        user={userData}
        changedAccountInfo={changedAccountInfo}
        setChangedAccountInfo={setChangedAccountInfo}
        setUserData={setUserData}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: { xs: "column-reverse", md: "row" },
          margin: {xs: 0, md: "40px 0"},
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
          <Typography
            sx={{
              fontSize: { xs: 28, sm: 35, md: 45 },
              fontWeight: "500",
              color: "white",
              textAlign: { xs: "center", md: "left" },
              marginTop: { xs: 4, md: 0 },
            }}
          >
            {userData?.profiles[0].display_data?.display_name}
          </Typography>
          <Box>
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: 12, sm: 14, md: 16 },
                marginTop: { xs: 1, md: 2 },
                lineHeight: 2,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {userData?.profiles[0].display_data?.description}
            </Typography>
          </Box>
          <Box
            marginTop={5}
            display="flex"
            sx={{ justifyContent: { xs: "space-around", md: "normal" } }}
          >
            {userData?.profiles[0]?.display_data?.email_text && (
              <Button
                sx={{
                  textTransform: "none",
                  color: "white",
                  fontWeight: "200",
                  fontSize: { xs: 13, sm: 15, md: 18 },
                  border: "1px solid #0dffda",
                  marginRight: { xs: 0, md: 8 },
                  width: {
                    xs:
                      userData.profiles[0].display_data.email_text.length * 5 +
                      50,
                    md:
                      userData.profiles[0].display_data.email_text.length * 7 +
                      50,
                  },
                  borderRadius: 2,
                }}
                onClick={() =>
                  (window.location = `mailto:${userData?.profiles[0]?.display_data?.email_id}`)
                }
              >
                {userData.profiles[0].display_data.email_text}
              </Button>
            )}
            {userData?.profiles[0]?.display_data?.web_text && (
              <Button
                sx={{
                  textTransform: "none",
                  color: "white",
                  fontWeight: "200",
                  fontSize: 18,
                  border: "1px solid #0dffda",
                  width:
                    userData.profiles[0].display_data.web_text.length * 7 + 50,
                  borderRadius: 2,
                }}
                onClick={() =>
                  window.open(`${userData?.profiles[0]?.display_data?.web_url}`)
                }
              >
                {userData.profiles[0].display_data.web_text}
              </Button>
            )}
          </Box>
        </Box>
        {userData?.profiles[0]?.display_data?.profile_image?.length ? (
          <Box
            component="img"
            sx={{
              height: { xs: 200, md: 400 },
              width: { xs: 200, md: 400 },
            }}
            src={userData.profiles[0].display_data.profile_image}
            alt="Not found"
          ></Box>
        ) : null}
      </Box>
      {userData?.profiles[0]?.socials?.twitterProfile?.length && userData?.profiles[0]?.socials?.youtubeChannel?.length ? <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            margin: { xs: "20px 0 50px 0", md: "70px 0" },
            width: { xs: "100%", sm: "50%" },
          }}
        >
          {userData?.profiles[0]?.socials?.twitterProfile?.length ? (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                width: "80px",
              }}
            >
              <TwitterIcon
                sx={{
                  color: "#1DA1F2",
                  fontSize: { xs: 30, md: 40 },
                  marginRight: 2,
                  "&:hover": { cursor: "pointer" },
                }}
                onClick={() =>
                  window.open(
                    `https://twitter.com/${userData.profiles[0].socials.twitterProfile[0].username}`,
                    "_blank"
                  )
                }
              />
              <Typography
                fontWeight="bold"
                sx={{ fontSize: { xs: 20, md: 22 } }}
              >
                {userData.profiles[0].socials.twitterProfile[0].followers_count}
              </Typography>
            </Box>
          ) : null}
          {userData?.profiles[0]?.socials?.twitterProfile?.length &&
          userData?.profiles[0]?.socials?.youtubeChannel?.length ? (
            <Typography fontSize={25} color="#0dffdabd">
              |
            </Typography>
          ) : null}
          {userData?.profiles[0]?.socials?.youtubeChannel?.length ? (
            <Box
              style={{ display: "flex", alignItems: "center", width: "80px" }}
            >
              <YouTubeIcon
                sx={{
                  color: "#FF0000",
                  fontSize: { xs: 30, md: 40 },
                  marginRight: 2,
                  "&:hover": { cursor: "pointer" },
                }}
                onClick={() =>
                  window.open(
                    `https://www.youtube.com/channel/${userData.profiles[0].socials.youtubeChannel[0]._id}`,
                    "_blank"
                  )
                }
              />
              <Typography
                fontWeight="bold"
                sx={{ fontSize: { xs: 20, md: 22 } }}
              >
                {
                  userData.profiles[0].socials.youtubeChannel[0]
                    .subscriber_count
                }
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Box> : null}
      {/* <Box>
        <Typography sx={{ fontSize: 25 }}>Total Reach</Typography>
        <Box display="flex" justifyContent="center">
          <Card
            first="Primary Platform"
            Icon={<YouTubeIcon sx={{ color: "#FF0000" }} />}
            second="YouTube"
            third="101k subscribers"
          />
          <Card
            first="Primary Platform"
            Icon={<YouTubeIcon sx={{ color: "#FF0000" }} />}
            second="YouTube"
            third="101k subscribers"
          />
        </Box>
      </Box> */}
      {userData?.profiles[0]?.socials?.twitterProfile?.length && (
        <TwitterSection data={userData.profiles[0].socials.twitterProfile} />
      )}
      {userData?.profiles[0]?.socials?.youtubeChannel?.length && (
        <YoutubeSection data={userData.profiles[0].socials.youtubeChannel} />
      )}
      {!userData?.profiles[0]?.socials?.twitterProfile?.length &&
      !userData?.profiles[0]?.socials?.youtubeChannel?.length ? (
        <Typography sx={{ textAlign: "center", fontSize: 20, marginTop: {xs: 0, md: 3} }}>No social accounts connected </Typography>
      ) : null}
      {/* <FacebookSection data={userData?.facebookProfile} /> */}
      {/* <InstagramSection /> */}
    </Box>
  );
};

export default Dashboard;
