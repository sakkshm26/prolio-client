import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  CircularProgress,
  FormControl,
  InputBase,
  InputLabel,
  TextField,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import instagramIcon from "../../ui/instagram.png";
import YouTubeIcon from "@mui/icons-material/YouTube";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsIcon from "@mui/icons-material/Settings";
import API from "../../api";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import "./styles.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Sidebar({
  drawerState,
  toggleDrawer,
  user,
  changedAccountInfo,
  setChangedAccountInfo,
  setUserData,
}) {
  const [generalData, setGenrealData] = useState({
    display_name: "",
    description: "",
    email_id: "",
    email_text: "",
    web_url: "",
    web_text: "",
  });
  const [generalError, setGeneralError] = useState(null);
  const [changedGeneralData, setChangedGeneralData] = useState(false);
  const [changedProfileImage, setChangedProfileImage] = useState(false);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [dialogAccount, setDailogAccount] = useState(null);

  const [file, setFile] = useState();
  const [fileError, setFileError] = useState(false);

  const MAX_FILE_SIZE = 5120;

  const handleClickOpen = (account) => {
    setDailogAccount(account);
    setOpen(true);
  };

  const handleClose = async (disconnect) => {
    if (disconnect) {
      setChangedAccountInfo(true)
      console.log("Disconnecting");
      await API.post(`http://localhost:4000/remove`, {
        account: dialogAccount,
        id: user?._id,
      })
        .then((res) => console.log(res.data))
        .catch((err) =>
          console.log("Something went wrong, please retry after some time.")
        );
    }
    setOpen(false);
    setDailogAccount(null);
  };

  const handleTwitterAuth = () => {
    let loginWindow = window.open(
      `http://prolioloadbalancer-742263347.us-east-1.elb.amazonaws.com/api/authentication/twitter/start/${user?._id}`,
      "_blank",
      "height=600, width=600"
    );

    var timer = setInterval(function () {
      if (loginWindow.closed) {
        clearInterval(timer);
        setChangedAccountInfo(true);
      }
    }, 1000);
  };

  const handleFacebookAuth = () => {
    let loginWindow = window.open(
      `https://www.facebook.com/v3.2/dialog/oauth?response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A4000%2Fapi%2Fauthentication%2Ffacebook%2Fredirect&scope=public_profile%2Cemail%2Cinstagram_basic%2Cinstagram_manage_insights%2Cpages_show_list%2Cpages_read_engagement%2Cread_insights%2Cpages_read_user_content&client_id=616175800209415&state=${user?._id}`,
      "_blank",
      "height=600, width=600"
    );

    var timer = setInterval(function () {
      if (loginWindow.closed) {
        clearInterval(timer);
        setChangedAccountInfo(true);
      }
    }, 1000);
  };

  const handleYoutubeAuth = () => {
    let loginWindow = window.open(
      `http://prolioloadbalancer-742263347.us-east-1.elb.amazonaws.com/api/authentication/youtube/start`,
      "_blank",
      "height=600, width=600"
    );

    var timer = setInterval(function () {
      if (loginWindow.closed) {
        clearInterval(timer);
        setChangedAccountInfo(true);
      }
    }, 1000);
  };

  const validateEmail = (email) => {
    var emailPattern = new RegExp(
      "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
    );
    return !!emailPattern.test(email);
  };

  const validateURL = (url) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!urlPattern.test(url);
  };

  const validate = () => {
    if (!generalData.display_name.length) return "display_name";
    else if (!generalData.description.length) return "description";
    else if (
      (!generalData.email_id.length && generalData.email_text.length) ||
      (generalData.email_id.length && !validateEmail(generalData.email_id))
    )
      return "email_id";
    else if (!generalData.email_text.length && generalData.email_id.length)
      return "email_text";
    else if (
      (!generalData.web_url.length && generalData.web_text.length) ||
      (generalData.web_url.length && !validateURL(generalData.web_url))
    )
      return "web_url";
    else if (!generalData.web_text.length && generalData.web_url.length)
      return "web_text";
    else return null;
  };

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
      .then((res) => {
        setChangedAccountInfo(true)
        console.log(res.data)
      })
      .catch((err) => console.log(err));

    setLoading(false);
  };

  const handleGeneralChange = (e) => {
    setGenrealData({ ...generalData, [e.target.name]: e.target.value });
    setChangedGeneralData(true);
  };

  const handleGeneralSubmit = async () => {
    if (changedGeneralData) {
      let error = validate();
      console.log("Error", error);
      if (error) {
        setGeneralError(error);
      } else {
        setGeneralError(null);
        setLoading(true);
        await API.post("/update", { ...generalData, id: user._id })
          .then((res) => {
            setUserData(res?.data?.user);
          })
          .catch((err) => alert("Something went wrong"));
        setLoading(false);
      }
    }
    if (changedProfileImage) {
      setChangedAccountInfo(true)
      if (file) {
        postImage();
      }
    }
  };

  useEffect(() => {
    setGenrealData({
      display_name: user?.profiles[0]?.display_data.display_name,
      description: user?.profiles[0]?.display_data.description,
      email_id: user?.profiles[0]?.display_data.email_id || "",
      email_text: user?.profiles[0]?.display_data.email_text || "",
      web_url: user?.profiles[0]?.display_data.web_url || "",
      web_text: user?.profiles[0]?.display_data.web_text || "",
    });
  }, [user]);

  const list = () => (
    <Box
      sx={{ width: 250, backgroundColor: "#121212" }}
      role="presentation"
      //   onClick={toggleDrawer}
      //   onKeyDown={toggleDrawer}
      className="sidebar"
    >
      <Box
        display="flex"
        justifyContent="right"
        alignItems="center"
        marginTop={1}
      >
        <CircularProgress size={18} sx={{ display: loading ? "block" : 'none' }} />
        <Button
          disabled={!changedProfileImage && !changedGeneralData}
          onClick={handleGeneralSubmit}
          sx={{
            color: "#0dffda",
            // width: "100%",
            display: "flex",
            justifyContent: "right",
            "&:disabled": {
              color: "#cccccc",
            },
          }}
        >
          Save
        </Button>
      </Box>
      <Accordion disableGutters={true} sx={{ backgroundColor: "#121212" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography fontWeight="bold">General</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form
            // onSubmit={handleGeneralSubmit}
            onChange={handleGeneralChange}
          >
            <FormControl variant="standard" sx={{ marginBottom: "10px" }}>
              <Typography sx={{ fontSize: 12 }}>Display name</Typography>
              <InputBase
                sx={{
                  marginTop: "8px",
                  borderRadius: 1,
                  position: "relative",
                  border: "1px solid #ced4da",
                  padding: "0 5px",
                  color: "white",
                }}
                style={
                  generalError === "display_name"
                    ? { border: "1px solid #B00020" }
                    : { border: "1px solid #ced4da" }
                }
                name="display_name"
                autoComplete="off"
                defaultValue={generalData.display_name}
                inputProps={{ maxLength: 20 }}
              />
            </FormControl>
            <FormControl variant="standard" sx={{ marginBottom: "10px" }}>
              <Typography sx={{ fontSize: 12 }}>Description</Typography>
              <InputBase
                sx={{
                  marginTop: "8px",
                  borderRadius: 1,
                  position: "relative",
                  border: "1px solid #ced4da",
                  padding: "0 5px",
                  color: "white",
                }}
                style={
                  generalError === "description"
                    ? { border: "1px solid #B00020" }
                    : { border: "1px solid #ced4da" }
                }
                autoComplete="off"
                name="description"
                defaultValue={generalData.description}
                inputProps={{ maxLength: 250 }}
              />
            </FormControl>
            <FormControl variant="standard" sx={{ marginBottom: "10px" }}>
              <Typography sx={{ fontSize: 12 }}>Email Id</Typography>
              <InputBase
                sx={{
                  marginTop: "8px",
                  borderRadius: 1,
                  position: "relative",
                  padding: "0 5px",
                  color: "white",
                }}
                style={
                  generalError === "email_id"
                    ? { border: "1px solid #B00020" }
                    : { border: "1px solid #ced4da" }
                }
                autoComplete="off"
                name="email_id"
                defaultValue={generalData.email_id}
                inputProps={{ maxLength: 30 }}
              />
            </FormControl>
            <FormControl variant="standard" sx={{ marginBottom: "10px" }}>
              <Typography sx={{ fontSize: 12 }}>Email button text</Typography>
              <InputBase
                sx={{
                  marginTop: "8px",
                  borderRadius: 1,
                  position: "relative",
                  border: "1px solid #ced4da",
                  padding: "0 5px",
                  color: "white",
                }}
                style={
                  generalError === "email_text"
                    ? { border: "1px solid #B00020" }
                    : { border: "1px solid #ced4da" }
                }
                autoComplete="off"
                name="email_text"
                defaultValue={generalData.email_text}
                inputProps={{ maxLength: 15 }}
              />
            </FormControl>
            <FormControl variant="standard" sx={{ marginBottom: "10px" }}>
              <Typography sx={{ fontSize: 12 }}>Website URL</Typography>
              <InputBase
                sx={{
                  marginTop: "8px",
                  borderRadius: 1,
                  position: "relative",
                  border: "1px solid #ced4da",
                  padding: "0 5px",
                  color: "white",
                }}
                style={
                  generalError === "web_url"
                    ? { border: "1px solid #B00020" }
                    : { border: "1px solid #ced4da" }
                }
                autoComplete="off"
                name="web_url"
                defaultValue={generalData.web_url}
                inputProps={{ maxLength: 40 }}
              />
            </FormControl>
            <FormControl variant="standard" sx={{ marginBottom: "10px" }}>
              <Typography sx={{ fontSize: 12 }}>Website button text</Typography>
              <InputBase
                sx={{
                  marginTop: "8px",
                  borderRadius: 1,
                  position: "relative",
                  border: "1px solid #ced4da",
                  padding: "0 5px",
                  color: "white",
                }}
                style={
                  generalError === "web_text"
                    ? { border: "1px solid #B00020" }
                    : { border: "1px solid #ced4da" }
                }
                autoComplete="off"
                name="web_text"
                defaultValue={generalData.web_text}
                inputProps={{ maxLength: 15 }}
              />
            </FormControl>
          </form>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters={true} sx={{ backgroundColor: "#121212" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography fontWeight="bold">Image</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              component="label"
              sx={{
                textTransform: "none",
                color: "#0dffda",
                border: "1px solid #0dffda",
              }}
            >
              Upload File
              <input onChange={fileSelected} type="file" hidden />
            </Button>
            <Typography color="white">
              {file?.name.length > 15
                ? `${file?.name.slice(0, 12)}...`
                : file?.name}
            </Typography>
          </form>
          {fileError ? (
            <Typography marginTop={2} fontSize={13} color="#B00020">
              {fileError}
            </Typography>
          ) : null}
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters={true} sx={{ backgroundColor: "#121212" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography fontWeight="bold">Accounts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Typography>Link Account</Typography>
            <Box marginTop={1} display="flex" justifyContent="space-evenly">
              <TwitterIcon
                sx={{
                  color: "#1DA1F2",
                  padding: "2px",
                  border: "1px solid #121212",
                  borderRadius: "5px",
                  "&:hover": {
                    cursor: "pointer",
                    // borderColor: "#121212",
                    boxShadow: "0 1px 7px 1px",
                  },
                }}
                onClick={handleTwitterAuth}
              />
              {/* <FacebookIcon
                sx={{
                  color: "#4267B2",
                  padding: "2px",
                  border: "1px solid #121212",
                  borderRadius: "5px",
                  "&:hover": {
                    cursor: "pointer",
                    // borderColor: "#121212",
                    boxShadow: "0 1px 8px 1px",
                  },
                }}
                onClick={handleFacebookAuth}
              /> */}
              <YouTubeIcon
                sx={{
                  color: "#FF0000",
                  padding: "2px",
                  border: "1px solid #121212",
                  borderRadius: "5px",
                  "&:hover": {
                    cursor: "pointer",
                    // borderColor: "#121212",
                    boxShadow: "0 1px 6px 0",
                  },
                }}
                onClick={handleYoutubeAuth}
              />
            </Box>
          </Box>
          <hr style={{ width: "60%", margin: "15px auto 15px auto" }} />
          <Typography sx={{ marginTop: 2 }}>Linked Accounts</Typography>
          <Box>
            {!user?.profiles[0]?.socials?.twitterProfile?.length && !user?.profiles[0]?.socials?.youtubeChannel?.length && (
              <Typography color="#737373" fontSize={14} marginTop={1}>
                No accounts connected
              </Typography>
            )}
            {user?.profiles[0]?.socials?.twitterProfile?.length ? (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                marginTop={2}
              >
                <Box display="flex" alignItems="center">
                  <TwitterIcon sx={{ color: "#1DA1F2", marginRight: "10px" }} />
                  <Typography>{user.profiles[0].socials.twitterProfile[0].username}</Typography>
                </Box>
                <DeleteIcon
                  sx={{
                    color: "#d11a2a",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => handleClickOpen("twitter")}
                />
              </Box>
            ) : null}
            {user?.profiles[0]?.socials?.youtubeChannel?.length ? (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                marginTop={2}
              >
                <Box display="flex" alignItems="center">
                  <YouTubeIcon sx={{ color: "#FF0000", marginRight: "10px" }} />
                  <Typography>{user.profiles[0].socials.youtubeChannel[0].name}</Typography>
                </Box>
                <DeleteIcon
                  sx={{
                    color: "#d11a2a",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => handleClickOpen("youtube")}
                />
              </Box>
            ) : null}
            {/* <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              marginTop={2}
            >
              <Box display="flex" alignItems="center">
                <FacebookIcon sx={{ color: "#4267B2", marginRight: "10px" }} />
                <Typography>Page 1</Typography>
              </Box>
              <SettingsIcon sx={{ color: "white" }} />
            </Box> */}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{ backgroundColor: "#212121" }}>
          <DialogContentText id="alert-dialog-slide-description" sx={{ color: "white", marginTop: 1 }}>
            Are you sure you want to disconnect the account?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#212121", justifyContent: "center" }}>
          <Button onClick={() => handleClose(false)} sx={{ color: "white" }}>Go back</Button>
          <Button onClick={() => handleClose(true)} sx={{ color: "white" }}>Disconnect</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"left"}
          open={drawerState}
          onClose={toggleDrawer}
          PaperProps={{ sx: { backgroundColor: "#121212" } }}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
