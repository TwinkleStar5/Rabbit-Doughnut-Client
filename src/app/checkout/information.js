import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Time from "./time";

function Information() {
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

  const [selectedOption, setSelectedOption] = useState(null);

  const handleShipment = (option) => {
    setSelectedOption(option);
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            name="phone number"
            label="Phone number"
            fullWidth
            autoComplete="phone number"
            variant="outlined"
            color="info"
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
          />
          <FormControlLabel
            control={
              <Checkbox
                color="info"
                name="saveEmail"
                value="yes"
                disableFocusRipple
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
              defaultValue={defaultCountry}
              InputProps={{ readOnly: true }}
              helperText="We apologise, Rabbit Doughnuts only do shipping across Malaysia"
              variant="outlined"
              color="info"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="State"
              fullWidth
              variant="outlined"
              color="info"
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address"
              fullWidth
              autoComplete="shipping address-level2"
              variant="outlined"
              color="info"
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="postal code"
              label="Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="outlined"
              color="info"
            />
          </Grid>
        </Grid>
      )}
      {selectedOption == "Pick Up" && <Time />}
    </>
  );
}

export default Information;
