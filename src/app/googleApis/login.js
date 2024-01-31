import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { GoogleLogin } from "react-google-login";
import { generateToken } from "@/utils/users";

const clientId =
  "821687526755-4a7n1niuf8phj6qtes2olnmhugs46sft.apps.googleusercontent.com";

function Login({ setUser }) {
  const theme = useTheme();
  const onSuccess = async (res) => {
    setUser({ token: res.accessToken, data: res.profileObj });
    let userData = {
      ...res.profileObj,
      isAdmin:
        "rabbitdoughnuts@gmail.com" === res.profileObj.email ? true : false,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    let token = await generateToken(userData);
    localStorage.setItem("token", token);
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED! ", res);
  };

  const customGoogleButton = ({ onClick }) => (
    <Button
      onClick={onClick}
      sx={{
        width: "100px",
        borderRadius: "13px",
        display: { sm: "none", md: "block" },
      }}
    >
      Login
    </Button>
  );

  return (
    <Box id="signInButton" mdUp>
      <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        render={(renderProps) => customGoogleButton(renderProps)}
      />
    </Box>
  );
}

export default Login;
