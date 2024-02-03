import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

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
      <DateCalendar
        value={selectedDate}
        disablePast
        onChange={handleDateChange} // Call handleDateChange when the user selects a new date
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
