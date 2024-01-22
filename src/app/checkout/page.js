"use client";
import * as React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Input,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Information from "./information";
import Payment from "./payment";
import Shipping from "./shipping";
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
const steps = ["Information", "Payment", "Shipping"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Information />;
    case 1:
      return <Payment />;
    case 2:
      return <Shipping />;
    default:
      throw new Error("Unknown step");
  }
}
function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <Grid container sx={{ py: 4, pl: 4 }} spacing={3}>
        <Grid container md={7} sx={{ p: 8 }}>
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
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
        <Grid container sx={{ bgcolor: "#F5F5F5", p: 3, pt: 7 }} md={5}>
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
          <Grid item sx={{ display: "flex" }}>
            <Input label="Discount code" fullWidth variant="outlined" />
            <Button>APPLY</Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Checkout;
