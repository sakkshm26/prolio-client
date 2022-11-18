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
import { Loading } from "../Loading";

const Profile = () => {
  const { username } = useParams();
  const { user } = useContext(AuthContext);

  const [changedGeneralInfo, setChangedGeneralInfo] = useState(false);
  const [changedAccountInfo, setChangedAccountInfo] = useState(false);

  const [isOwner, setIsOwner] = useState(false);
  const [profile, setProfile] = useState(null);
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
    async function getUser() {
      console.log("Fetching user");
      await API.get(`/user/get/${username}`, {
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
          setProfile(res?.data?.profile);
        })
        .catch((err) => console.log(err));
      setChangedAccountInfo(false);
    }
    getUser();
  }, [changedAccountInfo]);

  return (
    <Box sx={{ padding: { xs: "1px 20px", md: "1px 150px" } }}>
      {profile ? (
        <Box>
          <Navbar
            toggleDrawer={toggleDrawer}
            isOwner={isOwner}
            profile={profile}
          />
          <Sidebar
            drawerState={drawerState}
            toggleDrawer={toggleDrawer}
            profile={profile}
            changedAccountInfo={changedAccountInfo}
            setChangedAccountInfo={setChangedAccountInfo}
            setProfile={setProfile}
          />
          <Box
            justifyContent={profile.profile_image ? "space-around" : "center"}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: { xs: "column-reverse", md: "row" },
              margin: { xs: 0, md: "40px 0" },
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
              <Typography
                textAlign={profile.profile_image ? "left" : "center"}
                sx={{
                  fontSize: { xs: 28, sm: 35, md: 45 },
                  fontWeight: "500",
                  color: "white",
                  marginTop: { xs: 4, md: 0 },
                }}
              >
                {profile.display_name || user.profile.name}
              </Typography>
              <Box>
                <Typography
                  textAlign={profile.profile_image ? "left" : "center"}
                  sx={{
                    color: "white",
                    fontSize: { xs: 12, sm: 14, md: 16 },
                    marginTop: { xs: 1, md: 2 },
                    lineHeight: 2,
                  }}
                >
                  {profile.bio}
                </Typography>
              </Box>
              <Box
                marginTop={5}
                display="flex"
                sx={{ justifyContent: { xs: "space-around", md: "normal" } }}
              >
                {profile.email_button_text && (
                  <Button
                    sx={{
                      textTransform: "none",
                      color: "white",
                      fontWeight: "200",
                      fontSize: { xs: 13, sm: 15, md: 18 },
                      border: "1px solid #0dffda",
                      marginRight: { xs: 0, md: 8 },
                      width: {
                        xs: profile.email_button_text.length * 5 + 50,
                        md: profile.email_button_text.length * 7 + 50,
                      },
                      borderRadius: 2,
                    }}
                    onClick={() =>
                      (window.location = `mailto:${profile?.display_email}`)
                    }
                  >
                    {profile.email_button_text}
                  </Button>
                )}
                {profile?.url_button_text && (
                  <Button
                    sx={{
                      textTransform: "none",
                      color: "white",
                      fontWeight: "200",
                      fontSize: 18,
                      border: "1px solid #0dffda",
                      width: profile.url_button_text.length * 7 + 50,
                      borderRadius: 2,
                    }}
                    onClick={() => window.open(`${profile.display_url}`)}
                  >
                    {profile.url_button_text}
                  </Button>
                )}
              </Box>
            </Box>
            {profile.profile_image?.length ? (
              <Box
                component="img"
                sx={{
                  height: { xs: 200, md: 400 },
                  width: { xs: 200, md: 400 },
                }}
                src={profile.profile_image}
                alt="Not found"
              ></Box>
            ) : null}
          </Box>
          {profile?.twitter_profiles?.length &&
          profile?.youtube_profiles?.length ? (
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  margin: { xs: "20px 0 50px 0", md: "70px 0" },
                  width: { xs: "100%", sm: "50%" },
                }}
              >
                {profile?.twitter_profiles.length ? (
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
                          `https://twitter.com/${profile.twitter_profiles[0].username}`,
                          "_blank"
                        )
                      }
                    />
                    <Typography
                      fontWeight="bold"
                      sx={{ fontSize: { xs: 20, md: 22 } }}
                    >
                      {
                        profile.twitter_profiles[0]
                          .followers_count
                      }
                    </Typography>
                  </Box>
                ) : null}
                {profile?.twitter_profiles?.length &&
                profile?.youtube_profiles?.length ? (
                  <Typography fontSize={25} color="#0dffdabd">
                    |
                  </Typography>
                ) : null}
                {profile?.youtube_profiles.length ? (
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "80px",
                    }}
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
                          `https://www.youtube.com/channel/${profile.youtube_profiles[0].youtube_id}`,
                          "_blank"
                        )
                      }
                    />
                    <Typography
                      fontWeight="bold"
                      sx={{ fontSize: { xs: 20, md: 22 } }}
                    >
                      {
                        profile.youtube_profiles[0]
                          .subscriber_count
                      }
                    </Typography>
                  </Box>
                ) : null}
              </Box>
            </Box>
          ) : null}
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
          {profile?.twitter_profiles?.length && (
            <TwitterSection
              data={profile.twitter_profiles[0]}
            />
          )}
          {profile?.youtube_profiles.length && (
            <YoutubeSection
              data={profile.youtube_profiles[0]}
            />
          )}
          {!profile?.twitter_profiles.length &&
          !profile?.youtube_profiles.length ? (
            <Typography
              sx={{
                textAlign: "center",
                fontSize: 20,
                marginTop: { xs: 0, md: 3 },
              }}
            >
              No social accounts connected{" "}
            </Typography>
          ) : null}
          {/* <FacebookSection data={profile?.facebookProfile} /> */}
          {/* <InstagramSection /> */}
        </Box>
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default Profile;
