import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function Calendar2() {
  const [selectedDate, setSelectedDate] = React.useState(dayjs(new Date()));

  const formatDate = (date) => {
    return dayjs(date).format("D MMMM YYYY");
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);

    localStorage.setItem("selectedDate", formatDate(newValue));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          value={selectedDate}
          label="Choose a date!"
          onChange={handleDateChange}
          disablePast
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default Calendar2;
