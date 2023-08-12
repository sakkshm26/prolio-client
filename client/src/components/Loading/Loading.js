import { CircularProgress } from "@mui/material";
import React from "react";
import "./Loading.css";

const Loading = () => {
  return <CircularProgress sx={{ top: "45%", left: {xs: "47%", md: "49%"}, position: "absolute" }} size={28} />;
};

export default Loading;
