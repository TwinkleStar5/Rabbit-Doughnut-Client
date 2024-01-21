"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Typography } from "@mui/material";
import cart from "../../img/cart.png";
import Calendar from "./calendar";
import SideCartCard from "./SideCartCard";

function SideCart() {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 550,
        backgroundColor: "#FFFFF",
      }}
      role="presentation"
    >
      <List sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Your Cart
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Your cart is currently empty.
        </Typography>
        <SideCartCard />
      </List>
      <List sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Delivery Date
        </Typography>
        <Typography variant="h6">
          <Calendar />
        </Typography>
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor, true)}>
            <img src={cart.src} style={{ width: "30px" }} />{" "}
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default SideCart;
