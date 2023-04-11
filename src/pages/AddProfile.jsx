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
import { Loading } from "../components/Loading";

const InputTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#0cc6aa",
      },
    },
  },
})(TextField);

const AddProfile = () => {
  const [file, setFile] = useState();
  const [fileError, setFileError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({ username: "", bio: "" });

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

    await API.post("/user/image", formData, {
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
    await API.post("/user/addProfile", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    /* if (file) {
      postImage();
    } */

    window.location.reload();
  };

  return (
    <Box>
      {loading ? (
        <Loading />
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
            width={{xs: "90%", md: "40%"}}
            onChange={handleChange}
          >
            <InputTextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoComplete="off"
              autoFocus
              sx={{
                color: "white",
                backgroundColor: "#1b1b1b",
                input: { color: "#fff" },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            />
            <InputTextField
              margin="normal"
              required
              fullWidth
              label="Bio"
              name="bio"
              autoComplete="off"
              autoFocus
              sx={{
                color: "white",
                backgroundColor: "#1b1b1b",
                input: { color: "#fff" },
              }}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
            />
          </Box>
          {/* <Button
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
          </Button> */}
          <Button
            sx={{
              textTransform: "none",
              color: "white",
              backgroundColor: "#081430", '&:hover': {backgroundColor: "#081430"},
              marginTop: 2,
              width: {xs: "90%", md: "40%"}
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
