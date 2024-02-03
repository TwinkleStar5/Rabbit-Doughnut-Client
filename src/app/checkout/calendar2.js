import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function Calendar2() {
  const [selectedDate, setSelectedDate] = React.useState(dayjs(new Date()));

  const formatDate = (date) => {
    // return dayjs(date).format("D MMMM YYYY, h:mm A");
    return dayjs(date).format("D MMMM YYYY");
  };
  // Handler function to update the selected date
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    // setInfo({ ...info, dateToCollect: newValue });
    localStorage.setItem("selectedDate", formatDate(newValue));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker label="Choose a date!" onChange={handleDateChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default Calendar2;
