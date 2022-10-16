import { Box, Typography } from "@mui/material";
import React from "react";
import { Card } from "../molecules";
import { FacebookPost } from "../components";
import FacebookIcon from "@mui/icons-material/Facebook";

const FacebookSection = ({data}) => {
  return (
    <Box>
      <Typography sx={{ fontSize: 25 }}>Facebook Overview</Typography>
      <Box display="flex" justifyContent="center">
        <Card
          first="Followers"
          Icon={<FacebookIcon sx={{ color: "#4267B2" }} />}
          second={data && data[0]?.followers_count}
          // third="101k subscribers"
        />
        <Card
          first="Posts"
          Icon={<FacebookIcon sx={{ color: "#4267B2" }} />}
          second={data && data[0]?.posts_count}
          // third="101k subscribers"
        />
        <Card
          first="Average Engagement Likes"
          Icon={<FacebookIcon sx={{ color: "#4267B2" }} />}
          second="274"
          // third="101k subscribers"
        />
      </Box>
      <Typography sx={{ fontSize: 25 }}>Recent Facebook Posts</Typography>
      <Box display="flex" justifyContent="center">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // padding: "25px 50px",
            margin: 2,
            width: "100%",
            borderRadius: 2,
          }}
        >
          <FacebookPost />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // padding: "25px 50px",
            margin: 2,
            width: "100%",
            borderRadius: 2,
          }}
        >
          <FacebookPost />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // padding: "25px 50px",
            margin: 2,
            width: "100%",
            borderRadius: 2,
          }}
        >
          <FacebookPost />
        </Box>
      </Box>
    </Box>
  );
};

export default FacebookSection;
