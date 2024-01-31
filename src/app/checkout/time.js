import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";

function Time() {
  const [value, setValue] = React.useState(
    dayjs().set("hour", 8).startOf("hour")
  );
  const minTime = dayjs().set("hour", 8).startOf("hour");
  const maxTime = dayjs().set("hour", 21).startOf("hour");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker", "TimePicker"]}>
        <TimePicker
          label="Time to pick up your order"
          value={value}
          minTime={minTime}
          maxTime={maxTime}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default Time;
