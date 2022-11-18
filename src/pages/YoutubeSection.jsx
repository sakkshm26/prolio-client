import { Box, Typography } from "@mui/material";
import React from "react";
import { Card } from "../molecules";
import YouTubeIcon from "@mui/icons-material/YouTube";

const YoutubeSection = ({ data }) => {
  let video_data = data.recent_videos.slice(0,3);

  let average_comments = 0,
    average_likes = 0,
    average_views = 0;

  if (data.recent_videos.length) {
    data.recent_videos.forEach((video, i) => {
      average_likes += video.like_count;
      average_comments += video.comment_count;
      average_views += video.view_count;
    });

    average_likes = parseInt(average_likes / data.recent_videos.length);
    average_comments = parseInt(average_comments / data.recent_videos.length);
    average_views = parseInt(average_views / data.recent_videos.length);
  }

  // console.log(average_likes, average_comments, average_views);

  return (
    <Box id="youtube-section">
      <Typography
        sx={{
          fontSize: { xs: 21, md: 25 },
          marginBottom: 2,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        Youtube Overview
      </Typography>
      <Box
        display="flex"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          alignItems: { xs: "center" },
        }}
      >
        <Card
          first="Subscribers"
          // Icon={<YouTubeIcon sx={{ color: "#FF0000" }} />}
          second={data.subscriber_count}
          // third="101k subscribers"
        />
        <Card
          first="Videos"
          // Icon={<YouTubeIcon sx={{ color: "#FF0000" }} />}
          second={data.video_count}
          // third="101k subscribers"
        />
        <Card
          first="Views"
          // Icon={<YouTubeIcon sx={{ color: "#FF0000" }} />}
          second={data.view_count}
          // third="101k subscribers"
        />
      </Box>
      {data.recent_videos.length && (
        <Box marginTop={4}>
          <Typography
            sx={{
              fontSize: { xs: 21, md: 25 },
              marginBottom: 2,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Last {data.recent_videos.length} videos summary
          </Typography>
          <Box
            display="flex"
            sx={{
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-around",
              alignItems: { xs: "center" },
            }}
          >
            <Card first="Likes" second={average_likes} />
            <Card first="Views" second={average_views} />
            <Card first="Comments" second={average_comments} />
          </Box>
        </Box>
      )}
      {video_data.length && (
        <Box
          marginTop={4}
          sx={{
            fontSize: { xs: 21, md: 25 },
            marginBottom: 2,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography sx={{ fontSize: 25, marginBottom: 2 }}>
            Recent YouTube Videos
          </Typography>
          <Box
            display="flex"
            sx={{
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-around",
              alignItems: { xs: "center" },
            }}
          >
            {video_data.map((video) => (
              <Box
                key={video.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // padding: "25px 50px",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 2,
                  width: {xs: "95%", sm: "60%", md: "100%"},
                  // borderRadius: 2,
                }}
              >
                <Box
                  // width="420"
                  component="iframe"
                  sx={{ border: "none", height: "280px", width: {xs: "100%", lg: "80%"}, }}
                  src={`https://www.youtube.com/embed/${video.video_id}`}
                  // title="s"
                ></Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default YoutubeSection;
