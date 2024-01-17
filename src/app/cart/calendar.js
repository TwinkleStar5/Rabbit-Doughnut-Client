import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import Datetime from "react-datetime";
import "../globals.css";

function Calendar() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f7f8f9",
          borderRadius: "10px",
          p: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "23px" }}>
          <Datetime />
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: "#f7f8f9",
          borderRadius: "10px",
          mt: 2,
          p: 3,
        }}
      >
        <Typography variant="subtitle1">
          Delivered 8am to 9pm 97% likely to arrive on time, but on the odd
          occasion it could arrive the day after. For date-sensitive occasions
          such as birthdays, we recommend selecting one day earlier, on the rare
          occasion DPD delays delivery by a day.
        </Typography>
      </Box>
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
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button variant="button" sx={{ my: 2 }}>
          CHECKOUT
        </Button>
      </Box>
    </>
  );
}

export default Calendar;
