import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Default = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login')
  }, []);

  return <div></div>;
};

export default Default;
