import { Box, Typography } from "@mui/material";
import React from "react";

const InstagramPost = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #dbdbdb",
        borderRadius: 2,
      }}
    >
      <img
        style={{ height: 370 }}
        src="https://picsum.photos/seed/picsum/200/300"
        alt="Not found"
      />
      <Box sx={{ padding: "10px" }}>
        <Typography fontWeight="bold">123,587 likes</Typography>
        <Typography margin="5px 0">
          This is an example caption. It can be shorter or longer than this.
          Just testing out.
        </Typography>
        <Typography fontSize="14px" color="#8e8e8e">27 comments</Typography>
      </Box>
    </Box>
  );
};

export default InstagramPost;
