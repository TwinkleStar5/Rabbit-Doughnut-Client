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

export default function Topnav() {
  const handleLogoClick = () => {
    window.location.href = "/home";
  };

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
          <span>
            <IconButton href="/login">
              <img src={user.src} style={{ width: "30px" }} />
            </IconButton>
            <IconButton disableRipple>
              <SideCart />
            </IconButton>
          </span>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
