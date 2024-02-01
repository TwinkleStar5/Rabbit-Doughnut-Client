import { Box, Grid, TextField, Typography } from "@mui/material";
import Stripe from "./stripe";

function Payment({ info, selectedOption }) {
  console.log(info);
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
                sx={{ width: "100%" }}
                value={`${info.firstName}  ${info.lastName}`}
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
                sx={{ width: "100%" }}
                value={`${info?.email} / ${info?.phoneNumber}`}
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
                sx={{ width: "100%" }}
                value={
                  selectedOption === "Delivery" || selectedOption === "Pick Up"
                    ? localStorage.getItem("selectedDate")
                    : selectedOption === "Delivery"
                    ? info.address
                    : info.time instanceof Date
                    ? info.time
                        .toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .replace(/\d+:\d+/, (time) => {
                          const [hour, minute] = time.split(":");
                          const suffix = hour >= 12 ? "PM" : "AM";
                          return `${hour % 12 || 12}:${minute} ${suffix}`;
                        })
                    : ""
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
          <Stripe info={info} />
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
