import { Box, Typography } from "@mui/material";
import React from "react";

const FacebookPost = () => {
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="bold">123,587 likes</Typography>
          <Typography fontSize="14px" color="#65676B">
            27 comments
          </Typography>
        </Box>
        <Typography margin="5px 0">
          This is an example caption. It can be shorter or longer than this.
          Just testing out.
        </Typography>
      </Box>
    </Box>
  );
};

export default FacebookPost;
