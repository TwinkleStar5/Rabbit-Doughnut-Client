import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import Stripe from "./stripe";
import Payment_Button from "./stripe/button";
import { useRouter } from "next/router";
import "../globals.css";
import PreviewPage from "./button2_stripe";
import { styled } from "@mui/material/styles";
function Payment({ info, selectedOption, flatMappedData }) {
  // const router = useRouter();
  // console.log(info);
  const DemoPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    ...theme.typography.body2,

    width: "100%",
  }));

  return (
    <>
      <Grid
        container
        sx={{
          // border: "1px solid",
          // borderRadius: "5px",
          // borderColor: "#DEDEDE",
          p: 3,
          mb: 3,
          width: "100%",
        }}
      >
        <DemoPaper square={false} elevation={4} sx={{ pb: 3 }}>
          <Grid
            item
            sx={{
              display: "flex",
              borderBottom: "1px solid",
              borderColor: "#DEDEDE",
              paddingBottom: "5px",
              width: "100%",
            }}
          >
            <Grid container>
              <Grid item sx={{ mr: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#707070", width: "100%" }}
                >
                  Name:
                </Typography>
              </Grid>
              <Grid item>
                <Typography className="checkoutInput">{`${info.firstName} ${info.lastName}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              borderBottom: "1px solid",
              borderColor: "#DEDEDE",
              paddingBottom: "5px",
              width: "100%",
            }}
          >
            <Grid container>
              <Grid item sx={{ mr: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#707070", width: "100%" }}
                >
                  Contact:
                </Typography>
              </Grid>
              <Grid item>
                <Typography className="checkoutInput">{`0${info?.phoneNumber}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              borderBottom: "1px solid",
              borderColor: "#DEDEDE",
              paddingBottom: "5px",
              width: "100%",
            }}
          >
            <Grid container>
              <Grid item sx={{ mr: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#707070", width: "100%" }}
                >
                  {selectedOption === "Delivery"
                    ? "Ship To:"
                    : "Pick Up Date & Time:"}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className="checkoutInput">
                  {selectedOption === "Delivery"
                    ? info.address
                    : localStorage.getItem("selectedDate") + ", " + info.time}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </DemoPaper>
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
