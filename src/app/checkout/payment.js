import { Box, Grid, TextField, Typography } from "@mui/material";
import Stripe from "./stripe";
import Payment_Button from "./stripe/button";
import { useRouter } from "next/router";
import "../globals.css";
import PreviewPage from "./button2_stripe";
function Payment({ info, selectedOption, flatMappedData }) {
  // const router = useRouter();
  // console.log(info);
  return (
    <>
      <Grid
        container
        sx={{
          border: "1px solid",
          borderRadius: "5px",
          borderColor: "#DEDEDE",
          p: 3,
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
          <Grid item xs={2}>
            <Typography variant="subtitle1" sx={{ color: "#707070", pr: 4 }}>
              Name:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="subtitle1">
              <TextField
                className="checkoutInput"
                sx={{ width: "100%" }}
                value={`${info.firstName} ${info.lastName}`}
                InputProps={{
                  readOnly: true,
                  disableUnderline: true,
                }}
                disabled
                variant="standard"
              />
            </Typography>
          </Grid>
        </Grid>
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
          <Grid item xs={2}>
            <Typography variant="subtitle1" sx={{ color: "#707070", pr: 4 }}>
              Contact:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="subtitle1">
              <TextField
                className="checkoutInput"
                sx={{ width: "100%" }}
                value={`0${info?.phoneNumber}`}
                InputProps={{
                  readOnly: true,
                  disableUnderline: true,
                }}
                disabled
                variant="standard"
              />
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
            borderBottom: "1px solid",
            borderColor: "#DEDEDE",
            py: "5px",
          }}
        >
          <Grid item xs={4}>
            <Typography variant="subtitle1" sx={{ color: "#707070" }}>
              {selectedOption === "Delivery"
                ? "Ship To:"
                : "Pick Up Date & Time:"}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="subtitle1">
              <TextField
                className="checkoutInput"
                sx={{ width: "100%" }}
                value={
                  selectedOption === "Delivery"
                    ? info.address
                    : localStorage.getItem("selectedDate") + ", " + info.time
                }
                InputProps={{
                  readOnly: true,
                  disableUnderline: true,
                }}
                disabled
                variant="standard"
              />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <Payment_Button info={info} /> */}
          {/* <Stripe info={info} /> */}
          <Stripe info={info} flatMappedData={flatMappedData} />
          {/* <PreviewPage /> */}
        </Box>
      </Grid>
    </>
  );
}

export default Payment;

//  <Grid
//    item
//    xs={12}
//    sx={{
//      display: "flex",
//      justifyContent: "space-between",
//      paddingTop: "5px",
//    }}
//  >
//    <Grid item xs={2}>
//      <Typography variant="subtitle1" sx={{ color: "#707070" }}>
//        Shipping Method
//      </Typography>
//    </Grid>
//    <Grid item xs={10}>
//      <Typography variant="subtitle1">
//        {/* {data?.delivery ? "Delivery" : " Pick Up"} */}
//        delivery or pick up
//      </Typography>
//    </Grid>
//  </Grid>;
