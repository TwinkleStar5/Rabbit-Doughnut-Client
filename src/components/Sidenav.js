"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Typography, Grid } from "@mui/material";
import { shopDonut } from "./ShopNav";
import { Gifting } from "./ShopNav";
import LoginLogout from "@/app/googleApis/login&logout";
import { AuthContext } from "@/app/AuthProvider";
import "../app/globals.css";

export default function Sidenav() {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const [state, setState] = React.useState({
    left: false,
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

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "12px",

    backgroundColor: alpha(theme.palette.common.white, 0.15),
    // "&:hover": {
    //   backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: "100%",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "300px",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "black",
    fontWeight: "bold",
    width: "100%",

    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "25ch",
      },
    },
  }));

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 400,
        backgroundColor: "#F2F2F2",
        p: 3,
      }}
      role="presentation"
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            disableTouchRipple
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
          >
            <Accordion
              expanded={isExpanded}
              defaultExpanded
              sx={{
                border: "none",
                boxShadow: "none",
                backgroundColor: "#F2F2F2",
              }}
            >
              <AccordionSummary
                on
                expandIcon={<ExpandMoreIcon />}
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{ bgcolor: "#F2F2F2", p: "0" }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "30px",
                    bgcolor: "#F2F2F2",
                  }}
                >
                  Shop
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ListItemButton>
                  <Grid container spacing={3}>
                    <Grid item sm={6}>
                      <a href="/shopDoughnuts">{shopDonut}</a>
                    </Grid>
                    <Grid item sm={6}>
                      <a href="/">{Gifting}</a>
                    </Grid>
                  </Grid>
                </ListItemButton>
              </AccordionDetails>
            </Accordion>
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItemButton
          onClick={toggleDrawer(anchor, false)}
          disableTouchRipple
        >
          <a href="/dashboard">
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontSize: "30px" }}
            >
              Dashboard
            </Typography>
          </a>
        </ListItemButton>
      </List>
      <List>
        <ListItemButton onClick={toggleDrawer(anchor, false)}>
          <a href="/showProducts">
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontSize: "30px" }}
            >
              Our Menu
            </Typography>
          </a>
        </ListItemButton>
      </List>
      <List>
        <ListItemButton onClick={toggleDrawer(anchor, false)}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", fontSize: "30px" }}
          >
            Our Story
          </Typography>
        </ListItemButton>
      </List>
      <List>
        <ListItemButton onClick={toggleDrawer(anchor, false)}>
          <a href="/points&vouchers">
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontSize: "30px" }}
            >
              Points & Vouchers
            </Typography>
          </a>
        </ListItemButton>
      </List>
      <List>
        <ListItemButton onClick={toggleDrawer(anchor, false)}>
          <a href="/orders">
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontSize: "30px" }}
            >
              Your Orders
            </Typography>
          </a>
        </ListItemButton>
      </List>
      <List>
        <Search
          sx={{
            bgcolor: "transparent",
            border: "1.5px solid",
            borderColor: "#041E42 ",
          }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <Typography variant="subtitle1">
            <StyledInputBase
              placeholder="Search Our Products :)"
              sx={{ fontFamily: "Work Sans", color: "#041E42" }}
            />
          </Typography>
        </Search>
      </List>

      <List sx={{ paddingBottom: "200px" }}>
        <ListItemButton>
          <LoginLogout />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}> */}
          <MenuIcon onClick={toggleDrawer(anchor, true)} />
          {/* </Button> */}
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
