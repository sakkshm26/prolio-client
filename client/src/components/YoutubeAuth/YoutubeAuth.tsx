import React, { useEffect } from "react";
import { google } from "googleapis";
import { Link } from "react-router-dom";
import axios from "axios";

const YoutubeAuth = () => {
  useEffect(() => {
    axios.get("http://localhost:4000/yt", {
      method: "Get",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    }).then(res => console.log(res)).catch(err => console.log(err));
  }, []);

  return (
    <div>
      <button
        onClick={() =>
          window.location.replace("http://localhost:4000/youtube/auth")
        }
      >
        Youtube Auth
      </button>
    </div>
  );
};

export default YoutubeAuth;
