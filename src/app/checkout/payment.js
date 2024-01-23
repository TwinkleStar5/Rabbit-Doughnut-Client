import { Box, Grid, Typography } from "@mui/material";
import Stripe from "./stripe";

function Payment() {
  return (
    <>
      <Grid
        container
        sx={{
          border: "1px solid",
          borderRadius: "5px",
          borderColor: "#DEDEDE",
          p: 2,
          mb: 3,
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            borderBottom: "1px solid",
            borderColor: "#DEDEDE",
            paddingBottom: "5px",
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ color: "#707070", pr: 4 }}>
              Contact
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">valentina@gmail.com</Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "5px",
            borderBottom: "1px solid",
            borderColor: "#DEDEDE",
            py: "5px",
          }}
        >
          <Grid item xs={2}>
            <Typography variant="subtitle1" sx={{ color: "#707070" }}>
              Ship To
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="subtitle1">
              183, Jalan Magazine, George Town, 10300 George Town, Pulau Pinang
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "5px",
          }}
        >
          <Grid item xs={2}>
            <Typography variant="subtitle1" sx={{ color: "#707070" }}>
              Shipping Method
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="subtitle1">Delivery</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Stripe />
      </Grid>
    </>
  );
}

export default Payment;
