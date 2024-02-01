import React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";

function Time({ info, setInfo }) {
  const initialTime = dayjs().set("hour", 8).startOf("hour");
  const minTime = dayjs().set("hour", 8).startOf("hour");
  const maxTime = dayjs().set("hour", 21).startOf("hour");

  const handleTimeChange = (newValue) => {
    setInfo({ ...info, time: newValue["$d"] });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker", "TimePicker"]}>
        <TimePicker
          label="Time to pick up your order"
          time={initialTime}
          minTime={minTime}
          maxTime={maxTime}
          onChange={handleTimeChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default Time;
