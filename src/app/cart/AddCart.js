import * as React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import build from "../../img/build_placeholder.webp";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function ColorToggleButton() {
  const [alignment, setAlignment] = React.useState("web");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="white"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton
        sx={{
          bgcolor: "transparent",
          width: "100px",
          textAlign: "center",
          borderRadius: "12px",
          border: "none",
        }}
      >
        <Typography>2 Pack</Typography>
      </ToggleButton>
      <ToggleButton
        sx={{
          bgcolor: "transparent",
          width: "100px",
          textAlign: "center",
          borderRadius: "12px",
          border: "none",
        }}
      >
        <Typography>12 Pack</Typography>
      </ToggleButton>
      <ToggleButton
        sx={{
          bgcolor: "transparent",
          width: "100px",
          textAlign: "center",
          borderRadius: "12px",
          border: "none",
        }}
      >
        <Typography>24 Pack</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

function AddCart() {
  return (
    <>
      <Grid
        sx={{
          bgcolor: "white",
          borderRadius: "20px",
          p: 2,
        }}
      >
        {/* <Box>
          <ColorToggleButton />
        </Box> */}
        <Grid container>
          {[1, 2, 3].map((item) => (
            <Grid item md={4} key={item} sx={{ p: 1 }}>
              <img
                src={build.src}
                style={{ width: "100px", borderRadius: "18px", opacity: "0.3" }}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container>
          {[1, 2, 3].map((item) => (
            <Grid item md={4} key={item} sx={{ p: 1 }}>
              <img
                src={build.src}
                style={{ width: "100px", borderRadius: "18px", opacity: "0.3" }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid
        sx={{
          bgcolor: "white",
          borderRadius: "20px",
          p: 2,
          mt: 3,
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item md={6}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#F2F2F2 !important",
                borderRadius: "13px",
                width: "150px",
                mb: 1,
              }}
            >
              CLEAR SELECTION
            </Button>
            <Typography variant="subtitle1" sx={{ color: "#B5B5B5" }}>
              Remove your selected doughnuts
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Button
              variant="button"
              sx={{
                borderRadius: "13px",
                width: "150px",
                height: "83px",
                mb: 1,
              }}
            >
              RANDOMISE
            </Button>
            <Typography variant="subtitle1" sx={{ color: "#B5B5B5" }}>
              Can't decide? Let us choose!
            </Typography>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default AddCart;
