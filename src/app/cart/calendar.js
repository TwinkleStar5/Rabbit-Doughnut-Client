import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useState } from "react";

function Calendar() {
  // State variable to store the selected date
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));

  // Handler function to update the selected date
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
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
