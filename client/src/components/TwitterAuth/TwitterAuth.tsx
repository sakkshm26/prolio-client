import React, { useEffect, useState } from "react";
import axios from "axios";

const TwitterAuth = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:4000", {
        method: "GET",
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      })
      .then((res) => {
        console.log(res);
        if (res?.data?.user) {
          setUser(res.data.user);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      Twitter Auth
      {user ? (
        <button
          onClick={() =>
            window.open("http://localhost:4000/auth/logout", "_self")
          }
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => {
            setUser(null);
            window.open("http://localhost:4000/auth/twitter", "_self");
          }}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default TwitterAuth;
