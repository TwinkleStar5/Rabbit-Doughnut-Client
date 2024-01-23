"use client";
import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Modal,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Information from "./information";
import Payment from "./payment";
import donutGIF from "../../img/donutGIF.webp";
import Badge from "@mui/material/Badge";


const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    right: 3,
    top: 5,
    color: "white",
    padding: "0 4px",
  },
});
const steps = ["Information & Shipping", "Payment"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "60vh",
  overflowY: "auto",
  // width: 800,
  // height: 350,
  bgcolor: "background.paper",
  border: "0",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};
function getStepContent(step) {
  switch (step) {
    case 0:
      return <Information />;
    case 1:
      return <Payment />;
    default:
      throw new Error("Unknown step");
  }
}
function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <Grid container sx={{ pt: 4, pl: 4 }} spacing={3}>
        <Grid container md={7} sx={{ px: 8, pt: 8 }}>
          <Grid item>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    pb: 10,
                  }}
                >
                  {activeStep !== 0 && (
                    <Button
                      onClick={handleBack}
                      sx={{
                        mt: 3,

                        color: "white",
                        width: "150px",
                      }}
                    >
                      Back
                    </Button>
                  )}
                  {activeStep !== steps.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        mt: 3,
                        ml: 1,
                        color: "white",
                        width: "150px",
                      }}
                    >
                      Next
                    </Button>
                  ) : null}
                </Box>
              </React.Fragment>
            )}
          </Grid>
          <Grid item>
            <Grid container sx={{ py: 1 }}>
              <Grid item sx={{ justifyContent: "flex-end" }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "info",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={handleOpen}
                >
                  Shipping Policy
                </Typography>
                <Modal open={open} onClose={handleClose}>
                  <Box sx={style}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      Shipping policy
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                      <b> WHERE DO YOU DELIVER? </b>We deliver throughout
                      Malaysia. <br /> <br />
                      <b> FREE SHIPPING? </b>Shipping is free, when the order
                      amount is over RM40. If you live West Malaysia (Sabah &
                      Sarawak), then you will incur a delivery fee.
                    </Typography>
                  </Box>
                </Modal>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ bgcolor: "#F5F5F5", p: 6, pt: 8 }} md={5}>
          <Grid item>
            <Grid container sx={{ display: "flex", py: 2 }} spacing={2}>
              <Grid item xs={2}>
                <StyledBadge
                  badgeContent={2}
                  color="error"
                  invisible={false}
                  sx={{ fontFamily: "Work Sans" }}
                >
                  <img
                    src={donutGIF.src}
                    style={{
                      borderRadius: "10px",
                      border: "1px solid",
                      borderColor: "#EEEEEE",
                      borderRadius: "10px",
                    }}
                  />
                </StyledBadge>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Build A Pack - 6 Pack
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>
                  Pack Contents: 1. NOTORIOUS P.I.G 2. D'OH NUT 3. LIAM
                  HEMSWORTHY 4. DAVID HASSELHOFF 5. THE OG 6. GORDON JAMSAY
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>
                  Pack Size: 6
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  RM 26.90
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ display: "flex", width: "100%" }}>
            <TextField
              label="Discount Code"
              fullWidth
              variant="outlined"
              color="info"
              sx={{
                fontFamily: "Archivo Black",
                color: "#666666",
              }}
            />
            <Button
              variant="contained"
              sx={{
                height: "55px",
                width: "150px",
                ml: 3,
                bgcolor: "#EDEDED !important",
                color: "#666666",
                borderRadius: "5px",
                border: "1.5px solid",
                borderColor: "#D6D6D6",
                flex: "end",
              }}
              disableElevation
            >
              <Typography variant="h6">APPLY</Typography>
            </Button>
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>Subtotal</Box>
                <Box sx={{ fontWeight: "bold" }}>RM 59.90</Box>
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>Points collected</Box>
                <Box >59</Box>
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>Shipping</Box>
                <Box>Free</Box>
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mt: 3,
                  display: "flex",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Box>Total</Box>
                  <Box
                    sx={{
                      color: "#666666",
                      fontWeight: "light",
                      fontSize: "12px",
                    }}
                  >
                    Including RM 6.32 in taxes
                  </Box>
                </Box>
                <Box>Free</Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Checkout;
