import { Box, Typography } from "@mui/material";
import React from "react";
import { Card } from "../molecules";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { InstagramPost } from "../components";

const InstagramSection = () => {
  return (
    <Box>
      <Typography sx={{ fontSize: 25 }}>Instagram Overview</Typography>
      <Box display="flex" justifyContent="center">
        <Card
          first="Followers"
          img={true}
          second="10,795"
          // third="101k subscribers"
        />
        <Card
          first="Posts"
          img={true}
          second="857"
          // third="101k subscribers"
        />
        <Card
          first="Average Engagement Likes"
          img={true}
          second="274"
          // third="101k subscribers"
        />
      </Box>
      <Typography sx={{ fontSize: 25 }}>Recent Instagram Posts</Typography>
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
          <InstagramPost />
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
          <InstagramPost />
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
          <InstagramPost />
        </Box>
      </Box>
    </Box>
  );
};

export default InstagramSection;
