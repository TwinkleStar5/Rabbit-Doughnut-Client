import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Sidenav from "./Sidenav";
import SideCart from "@/app/cart/SideCart";
import PersonIcon from "@mui/icons-material/Person";
import user from "../img/user.png";
import logo from "../img/logo3.png";
import { useEffect, useState } from "react";
import Login from "@/app/auth/login";
import { gapi } from "gapi-script";
import Logout from "@/app/auth/logout";

const clientId =
  "821687526755-4a7n1niuf8phj6qtes2olnmhugs46sft.apps.googleusercontent.com";

export default function Topnav() {
  const handleLogoClick = () => {
    window.location.href = "/home";
  };

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ py: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            disableRipple
          >
            <Sidenav />
          </IconButton>
          <Box>
            <a href="/" onClick={handleLogoClick}>
              <img
                src={logo.src}
                style={{ height: "65px", margin: "auto" }}
              ></img>
            </a>
          </Box>
          {/* <span></span> */}
          {/* <IconButton>
              <img src={user.src} style={{ width: "30px" }} />
            </IconButton> */}
          <Box sx={{ display: "flex" }}>
            <Box sx={{ pt: "12px" }}>
              {!Object.keys(user).length ? (
                <Login key={"login"} setUser={setUser} />
              ) : (
                <Logout key={"logout"} setUser={setUser} />
              )}
            </Box>
            <IconButton disableRipple>
              <SideCart />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
