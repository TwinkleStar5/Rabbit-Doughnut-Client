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
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Typography } from "@mui/material";

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

    backgroundColor: alpha(theme.palette.common.white, 0.15), // Commented out
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
        width: anchor === "top" || anchor === "bottom" ? "auto" : 350,
        backgroundColor: "#F2F2F2",
      }}
      role="presentation"
    >
      <List>
        <ListItem disablePadding >
          <ListItemButton
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
                sx={{backgroundColor: "#F2F2F2"}}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", fontSize: "30px" }}
                >
                  Shop
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ListItemButton>
                  <Typography variant="h6">
                    <a href="/shopProducts"> Shop Doughnuts</a>
                  </Typography>
                </ListItemButton>
              </AccordionDetails>
            </Accordion>
          </ListItemButton>
        </ListItem>
      </List>
      <List sx={{ paddingLeft: "20px" }}>
        <ListItemButton onClick={toggleDrawer(anchor, false)}>
          <a href="/showProducts">
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", fontSize: "30px" }}
            >
              Menu
            </Typography>
          </a>
        </ListItemButton>
      </List>
      <List sx={{ paddingLeft: "20px" }}>
        <ListItemButton onClick={toggleDrawer(anchor, false)}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", fontSize: "30px" }}
          >
            Our Story
          </Typography>
        </ListItemButton>
      </List>
      <List sx={{ paddingLeft: "20px", paddingBottom: "262px" }}>
        <Search sx={{ bgcolor: "transparent", borderColor: "black" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search Our Products :)" />
        </Search>
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
