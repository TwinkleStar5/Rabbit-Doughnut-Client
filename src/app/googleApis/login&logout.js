import { useEffect, useState } from "react";
import Login from "@/app/googleApis/login";
import { gapi } from "gapi-script";
import Logout from "@/app/googleApis/logout";
import { Box } from "@mui/material";

const clientId =
  "821687526755-4a7n1niuf8phj6qtes2olnmhugs46sft.apps.googleusercontent.com";

function LoginLogout() {
  const [user, setUser] = useState({});

  useEffect(() => {
    function start() {
      gapi.auth2.getAuthInstance({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <Box sx={{ pt: "10px" }}>
      {!Object.keys(user).length ? (
        <Login key={"login"} setUser={setUser} />
      ) : (
        <Logout key={"logout"} setUser={setUser} />
      )}
    </Box>
  );
}

export default LoginLogout;
