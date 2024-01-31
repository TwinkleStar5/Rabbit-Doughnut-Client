import { Box, Button, useTheme } from "@mui/material";
import { GoogleLogout } from "react-google-login";

const clientId =
  "821687526755-4a7n1niuf8phj6qtes2olnmhugs46sft.apps.googleusercontent.com";

function Logout({ setUser }) {
  const theme = useTheme();
  const onSuccess = (res) => {
    setUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("Log out successful");
  };
  const customGoogleButton = ({ onClick }) => (
    <Button
      onClick={onClick}
      mdUp
      sx={{
        width: "100px",
        borderRadius: "13px",
      }}
    >
      Logout
    </Button>
  );
  return (
    <Box id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        onLogoutSuccess={onSuccess}
        render={(renderProps) => customGoogleButton(renderProps)}
      ></GoogleLogout>
    </Box>
  );
}

export default Logout;
