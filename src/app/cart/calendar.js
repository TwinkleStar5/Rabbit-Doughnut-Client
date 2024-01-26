"use client";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import "../globals.css";
import { Box } from "@mui/material";

function Calendar() {
  const [value, setValue] = useState(dayjs(new Date()));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        disablePast
        onChange={(newValue) => setValue(newValue)}
        sx={{
          bgcolor: "#F7F8F9",
          color: "#041E42",
          fontFamily: "Archivo Black",
          border: "1px solid",
          borderColor: "#EEEEEE",
          borderRadius: "10px",
          width: "410px",
        }}
      />
    </LocalizationProvider>
  );
}

export default Calendar;
