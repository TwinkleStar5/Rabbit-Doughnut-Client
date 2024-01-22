"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Button, IconButton, Typography } from "@mui/material";
import cart from "../../img/cart.png";
import Calendar from "./calendar";
import SideCartCard from "./SideCartCard";
import Badge from "@mui/material/Badge";

const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    right: 10,
    top: 30,
    color: "white",
    padding: "0 4px",
  },
});

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
  const handleRemoveCard = () => {
    // Perform removal logic here (e.g., update the cart state)
    // For now, let's just set the state to an empty array
    // Replace this with your actual logic
    setState({ right: false });

    // Invalidate the query to trigger a re-fetch
    queryClient.invalidateQueries("cart");
  };
  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 520,
        backgroundColor: "#FFFFF",
        p: 4,
      }}
      role="presentation"
    >
      <List>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Your Cart
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Your cart is currently empty.
        </Typography>
        <SideCartCard onRemove={handleRemoveCard} />
      </List>
      <List>
        <Typography variant="h4" sx={{ my: 2 }}>
          Delivery Date
        </Typography>
        <Box>
          <Calendar />
        </Box>
      </List>
      <List>
        <Box
          sx={{
            bgcolor: "#f7f8f9",
            borderRadius: "10px",
            mt: 2,
            p: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>
            Delivered 8am to 9pm 97% likely to arrive on time, but on the odd
            occasion it could arrive the day after. For date-sensitive occasions
            such as birthdays, we recommend selecting one day earlier, on the
            rare occasion DPD delays delivery by a day.
          </Typography>
        </Box>
      </List>
      <List>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>Subtotal</Box>
            <Box>RM 59.90</Box>
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            Shipping is calculated at checkout
          </Typography>
        </Box>
      </List>
      <List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="button" sx={{ my: 2, borderRadius: "13px" }}>
            <a href="/checkout">CHECKOUT</a>
          </Button>
        </Box>
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <StyledBadge
            badgeContent={4}
            color="error"
            invisible={false}
            sx={{ fontFamily: "Work Sans" }}
          >
            <IconButton onClick={toggleDrawer(anchor, true)}>
              <img src={cart.src} style={{ width: "30px" }} />
            </IconButton>
          </StyledBadge>
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
