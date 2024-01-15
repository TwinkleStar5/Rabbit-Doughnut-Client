import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Sidenav from "./Sidenav";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import logo from "../img/logo3.png";

export default function Topnav() {
  const handleLogoClick = () => {
    window.location.href = "/"; // Replace "/" with your homepage URL
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ pt: 2 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
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
            <IconButton>
              <PersonIcon />
            </IconButton>
            <IconButton>
              <ShoppingBasketIcon />
            </IconButton>
          </span>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
