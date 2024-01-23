import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

const shouldDisableTime = (value, view) =>
  view === "hours" && value.hour() > 21 && value.hour() < 7;

function Time() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer>
        <DemoItem label="Mobile variant">
          <MobileTimePicker
            defaultValue={dayjs("2024-01-17T15:30")}
            shouldDisableTime={shouldDisableTime}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default Time;
