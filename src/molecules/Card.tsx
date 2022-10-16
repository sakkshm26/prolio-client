import { Box, Typography } from "@mui/material";
import React from "react";
import instagramIcon from "../ui/instagram.png";

interface TProps {
  first: String;
  Icon?: React.ReactNode;
  img?: boolean;
  second: String;
  third?: String;
}

const Card: React.FC<TProps> = ({ first, second, third }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: {xs: "15px 40px", sm: "25px 50px"},
        margin: 2,
        background: "linear-gradient(#191831, #051916)",
        width: {xs: "80%", sm: "100%"},
        borderRadius: 2,
        maxWidth: '300px'
      }}
    >
      <Typography sx={{ fontSize: {xs: 14,md: 17} }}>{first}</Typography>
      <Typography sx={{ fontSize: {xs: 23,md: 27}, fontWeight: "bold", margin: "5px 0" }}>
        {second}
      </Typography>
      {/* {third && <Typography sx={{ fontSize: 16 }}>{third}</Typography>} */}
    </Box>
  );
};

export default Card;
