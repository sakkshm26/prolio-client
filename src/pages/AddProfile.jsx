import {
  Box,
  Button,
  FormControl,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import API from "../api";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#e3e3e3",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#07655e",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#07655e",
        borderWidth: 1,
        borderRadius: "5px 0 0 1px",
      },
      "&:hover fieldset": {
        borderColor: "#07655e",
        borderWidth: 1,
        borderRadius: "5px 0 0 1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#07655e",
        borderWidth: 1,
        borderRadius: "5px 0 0 1px",
      },
    },
  },
})(TextField);

const AddProfile = () => {
  const [file, setFile] = useState();
  const [fileError, setFileError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({ display_name: "", description: "" });

  const MAX_FILE_SIZE = 5120;

  const fileSelected = (event) => {
    const file = event.target.files[0];
    if (file) {
      let fileSize = file.size / 1024;
      if (fileSize > MAX_FILE_SIZE) {
        setFileError("File size should be less than 5 MB!");
      } else if (file.type !== "image/jpeg" && file.type !== "image/png") {
        setFileError("Image type should be of png or jpeg format!");
      } else {
        setFile(file);
        setFileError(null);
      }
    }
  };

  const postImage = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    await API.post("/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setLoading(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (data.display_name === "") {
      setNameError("Display name is required");
    } else if (data.description === "") {
      setNameError(null);
      setDescriptionError("Description is required");
    } else {
      setNameError(null);
      setDescriptionError(null);
      await API.post("/user/setup", data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }

    if (file) {
      postImage();
    }

    window.location.reload()
  };

  return (
    <Box>
      {loading ? (
        <Box className="loading"></Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography color="white" marginTop={5} fontSize={20}>
            Add your profile
          </Typography>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            // justifyContent="center"
            alignItems="center"
            width="100%"
            onChange={handleChange}
          >
            <CssTextField
              name="display_name"
              placeholder="Display Name"
              sx={{
                input: { color: "#e3e3e3", fontSize: { xs: 13, sm: 16 } },
                "& input": { padding: "10px 10px" },
                width: "40%",
                marginTop: 3,
              }}
              inputProps={{ maxLength: 20 }}
              autoComplete="off"
            />
            {nameError ? (
              <Typography marginTop={1} fontSize={13} color="#B00020">
                {nameError}
              </Typography>
            ) : null}
            <CssTextField
              name="description"
              placeholder="Description"
              sx={{
                input: { color: "#e3e3e3", fontSize: { xs: 13, sm: 16 } },
                "& input": { padding: "10px 10px" },
                width: "40%",
                marginTop: 5,
              }}
              inputProps={{ maxLength: 250 }}
              autoComplete="off"
            />
            {descriptionError ? (
              <Typography marginTop={1} fontSize={13} color="#B00020">
                {descriptionError}
              </Typography>
            ) : null}
          </Box>
          <Button
            component="label"
            sx={{
              textTransform: "none",
              color: "#05d0b1",
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box display="flex" alignItems="center">
              <UploadFileIcon />
              Upload photo
              <input onChange={fileSelected} type="file" hidden />
            </Box>
            <Typography color="white" marginTop={1}>
              {file?.name.length > 25
                ? `${file?.name.slice(0, 25)}...`
                : file?.name}
            </Typography>
            {fileError ? (
              <Typography marginTop={1} fontSize={13} color="#B00020">
                {fileError}
              </Typography>
            ) : null}
          </Button>
          <Button
            sx={{
              textTransform: "none",
              color: "#05d0b1",
              border: "1px solid #05d0b1",
              marginTop: 2,
              width: "40%",
            }}
            onClick={handleSubmit}
          >
            Add Profile
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddProfile;
