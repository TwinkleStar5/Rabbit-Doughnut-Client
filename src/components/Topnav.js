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
import { useEffect } from "react";
import Login from "@/app/auth/login";
import Logout from "@/app/auth/logout";

const clientId =
  "821687526755-4a7n1niuf8phj6qtes2olnmhugs46sft.apps.googleusercontent.com";

export default function Topnav() {
  const handleLogoClick = () => {
    window.location.href = "/home";
  };

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: clientId,
  //       scope: "",
  //     });
  //   }
  //   gapi.load("client:auth2", start);
  // });

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
          <a href="/" onClick={handleLogoClick}>
            <img
              src={logo.src}
              style={{ height: "65px", margin: "auto" }}
            ></img>
          </a>
          {/* <span></span> */}
          {/* <IconButton>
              <img src={user.src} style={{ width: "30px" }} />
            </IconButton> */}
          <div style={{ display: "flex" }}>
            <div style={{ paddingTop: "12px" }}>
              <Login />
            </div>
            <IconButton disableRipple>
              <SideCart />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
