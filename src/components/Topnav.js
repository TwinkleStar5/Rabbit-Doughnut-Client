import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Sidenav from "./Sidenav";
import SideCart from "@/app/cart/SideCart";
import logo from "../img/logo3.png";
import { Grid } from "@mui/material";
import LoginLogout from "@/app/googleApis/login&logout";
import "../app/globals.css";
function Topnav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{ py: 2 }}
        className="TopNav"
        elevation="none"
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item xs={4}>
              <IconButton
                className="menuItem"
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                disableRipple
              >
                <Sidenav />
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <a href="/home">
                <img
                  className="logo"
                  src={logo.src}
                  style={{
                    height: "65px",
                    margin: "auto",
                  }}
                />
              </a>
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "flex-end" }} xs={4}>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <LoginLogout />
              </Box>
              <IconButton disableRipple>
                <SideCart />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Topnav;
