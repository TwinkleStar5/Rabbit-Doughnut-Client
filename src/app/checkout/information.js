import { useState } from "react";
import { Button, Grid, InputAdornment, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Time from "./time";

function Information({
  info,
  setInfo,
  selectedOption,
  setSelectedOption,
  onTimeChange,
  handleTimeChange,
  setStateFee,
  setSelectedTime,
}) {
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{2}-\d{7}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const defaultCountry = "Malaysia";
  const states = [
    { value: "Penang" },
    { value: "Selangor" },
    { value: "Johor" },
    { value: "Malacca" },
    { value: "Sabah" },
    { value: "Sarawak" },
    { value: "Kedah" },
    { value: "Perak" },
    { value: "Perlis" },
    { value: "Terengganu" },
    { value: "Pahang" },
    { value: "Kelantan" },
    { value: "Negeri Sembilan" },
  ];

  const buttonStyle = {
    width: "150px",
    borderRadius: "10px",
  };

  const handleShipment = (option) => {
    setSelectedOption(option);
    setInfo({ ...info, mode: option });
    setStateFee("Free");
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    console.log(info);
    let fee = 5;
    if (
      e.target.name === "state" &&
      (e.target.value === "Sabah" || e.target.value === "Sarawak")
    ) {
      fee = 8;
    }
    setStateFee(fee);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Contact</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            color="info"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
            color="info"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="phoneNumber"
            label="Phone number"
            fullWidth
            autoComplete="phone number"
            variant="outlined"
            color="info"
            id="outlined-error-helper-text"
            helperText={
              info.phoneNumber && !isValidPhoneNumber(info.phoneNumber)
                ? "Invalid phone number. Only Malaysian number. Please add a hypen ('-') in between"
                : ""
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+60</InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="email"
            label="Email"
            fullWidth
            autoComplete="given-email"
            variant="outlined"
            color="info"
            id="outlined-error-helper-text"
            helperText={
              info.email && !isValidEmail(info.email) ? "Invalid email" : ""
            }
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="info"
                name="saveEmail"
                value="yes"
                disableFocusRipple
                onChange={handleChange}
              />
            }
            label="Email me with news and offers"
          />
        </Grid>
      </Grid>
      <Grid container sx={{ my: 3, justifyContent: "space-around" }}>
        {["Pick Up", "Delivery"].map((option) => (
          <Button
            key={option}
            variant="contained"
            sx={{
              ...buttonStyle,
              bgcolor:
                selectedOption === option
                  ? "#ADDFB3 !important"
                  : "#EDEDED !important",
              color: "#666666",
            }}
            disableElevation
            onClick={() => handleShipment(option)}
          >
            {option}
          </Button>
        ))}
      </Grid>
      {selectedOption == "Delivery" && (
        <Grid container spacing={3} className="Shipping Address">
          <Grid item xs={12}>
            <Typography variant="h5">Shipping Address</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="Country"
              name="country"
              defaultValue={defaultCountry}
              InputProps={{ readOnly: true }}
              helperText="We apologise, Rabbit Doughnuts only do shipping across Malaysia"
              variant="outlined"
              color="info"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="State"
              name="state"
              fullWidth
              variant="outlined"
              color="info"
              onChange={handleChange}
            >
              {states.map((option) => (
                <MenuItem key={option.key} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="company"
              label="Company(optional)"
              fullWidth
              autoComplete="company"
              variant="outlined"
              color="info"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address"
              label="Address"
              fullWidth
              autoComplete="shipping address-level2"
              variant="outlined"
              color="info"
              multiline
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="outlined"
              color="info"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="postalCode"
              label="Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="outlined"
              color="info"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      )}
      {selectedOption == "Pick Up" && (
        <Time setSelectedTime={setSelectedTime} info={info} setInfo={setInfo} />
      )}
    </>
  );
}

export default Information;
