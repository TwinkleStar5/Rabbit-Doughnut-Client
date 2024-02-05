"use client";
import * as React from "react";
import { useState } from "react";
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
import { useQuery } from "react-query";
import { getCart } from "@/utils/cart";
import { getOrder } from "@/utils/orders";
import { handleVerifyAllFill } from "./information";

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

function Checkout() {
  const [info, setInfo] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [stateFee, setStateFee] = useState(0);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Information
            info={info}
            setInfo={setInfo}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            setStateFee={setStateFee}
          />
        );
      case 1:
        return (
          <Payment
            info={info}
            flatMappedData={flatMappedData}
            selectedTime={selectedTime}
            selectedOption={selectedOption}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  const { data: cartData } = useQuery("carts", getCart);
  const { data: orderData } = useQuery("orders", getOrder);

  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showSelection, setShowSelection] = React.useState(false);
  const handleToggleSelection = () => {
    setShowSelection(!showSelection);
  };
  const selection = {
    bgcolor: "#F3F3F3 !important",
    border: "1px solid",
    borderColor: "#D6D6D6",
    borderRadius: "10px",
    color: "#041E42 !important",
    fontFamily: "Work Sans",
    fontWeight: "500",
    textTransform: "none",
    width: "200px",
    fontSize: "16px",
    p: "2px",
    mb: 1,
  };
  const handleNext = (total) => {
    setActiveStep(activeStep + 1);
    setInfo({ ...info, total });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const flatMappedData = cartData?.mainCart
    ? cartData?.mainCart.map((item) => {
        const innerQuantity = item.items.reduce(
          (acc, innerItem) => acc + innerItem.quantity,
          0
        );
        let price;
        if (innerQuantity === 2) price = 9.9;
        if (innerQuantity === 6) price = 26.9;
        if (innerQuantity === 12) price = 49.9;
        return {
          outerQuantity: item.quantity,
          innerQuantity,
          price,
          subtotal: price * item.quantity,
        };
      })
    : null;

  let subtotal = 0;

  let allPacks = cartData?.mainCart
    ? cartData?.mainCart.map((pack) => pack.items)
    : null;

  let total =
    flatMappedData?.reduce((value, item) => {
      value += item.subtotal;

      return value;
    }, 0) + stateFee;

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
                      // disabled={
                      //   (selectedOption === "Pick Up" &&
                      //     Object.keys(info).length === 6) ||
                      //   (selectedOption === "Delivery" &&
                      //     Object.keys(info).length >= 8)
                      //     ? false
                      //     : true
                      // }
                      variant="contained"
                      onClick={() => handleNext(total)}
                      sx={{
                        mt: 3,
                        ml: 1,
                        color: "white !important",
                        width: "150px !important",
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
          {cartData &&
            allPacks?.map((pack, idx) => {
              let perPack = (
                parseInt(flatMappedData[idx].outerQuantity) *
                parseFloat(flatMappedData[idx].price)
              ).toFixed(2);
              subtotal += parseFloat(perPack);
              return (
                <Grid item>
                  <Grid container sx={{ display: "flex", py: 2 }} spacing={2}>
                    <Grid item xs={2}>
                      <StyledBadge
                        badgeContent={flatMappedData[idx].outerQuantity}
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
                    <Grid item xs={7}>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {flatMappedData[idx].innerQuantity} Pack Doughnuts
                      </Typography>
                      {/* <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>
                        Pack Contents: 1. NOTORIOUS P.I.G 2. D'OH NUT 3. LIAM
                        HEMSWORTHY 4. DAVID HASSELHOFF 5. THE OG 6. GORDON
                        JAMSAY
                      </Typography> */}
                      <Button
                        key={idx}
                        variant="contained"
                        sx={selection}
                        disableElevation
                        disableRipple
                        onClick={handleToggleSelection}
                      >
                        {showSelection ? "Hide" : "View"} selection
                      </Button>

                      {showSelection && (
                        <Box
                          sx={{
                            border: "1px dashed",
                            borderColor: "#041E42",
                            borderRadius: "6px",
                            p: 1,
                            mb: 2,
                          }}
                        >
                          {pack.map((innerIdx) => {
                            return (
                              <>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    whiteSpace: "pre-line",
                                    fontStyle: "italic",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    color: "#041E42",
                                  }}
                                >
                                  {innerIdx.product.name} x {innerIdx.quantity}
                                </Typography>
                              </>
                            );
                          })}
                        </Box>
                      )}
                      {/* <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>
                        Pack Size: {flatMappedData[idx].outerQuantity}
                      </Typography> */}
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        RM {flatMappedData[idx].subtotal.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
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
                <Box sx={{ fontWeight: "bold" }}>RM {subtotal.toFixed(2)}</Box>
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
                <Box>59</Box>
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
                <Box>
                  {stateFee !== 0
                    ? `RM ${parseFloat(stateFee).toFixed(2)}`
                    : "Free"}
                </Box>
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mt: 3,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box>Total</Box>
                {/* <Box
                    sx={{
                      color: "#666666",
                      fontWeight: "light",
                      fontSize: "12px",
                    }}
                  >
                    Including RM 6.32 in taxes
                  </Box> */}
                {/* <Box>RM {grandTotal}</Box> */}
                <Box>
                  RM{" "}
                  {stateFee !== "Free"
                    ? parseInt(stateFee) + parseFloat(subtotal.toFixed(2))
                    : subtotal.toFixed(2)}
                </Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Checkout;
