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
import { useQuery } from "react-query";
import { getCart } from "@/utils/cart";
import "../app/globals.css";
function Topnav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ py: 2 }}
        className="TopNav"
        elevation="none"
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container>
            <Grid item sm={4}>
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
            <Grid item sm={4}>
              <a href="/home">
                <img
                  src={logo.src}
                  style={{ height: "65px", margin: "auto" }}
                />
              </a>
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "flex-end" }} md={4}>
              <LoginLogout sx={{ display: { sm: "none" } }} />
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
