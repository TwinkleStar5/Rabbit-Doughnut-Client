import { Box, Button, Grid, Typography } from "@mui/material";
import donutGIF from "../../img/donutGIF.webp";
import { useState, forwardRef } from "react";
import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import "../globals.css";
import { useQuery } from "react-query";
import { getCart, deleteSingleMainCart, updateQtyPack } from "@/utils/cart";
import { useQueryClient } from "react-query";
const NumberInput = forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="medium" />,
          className: "increment",
        },
        decrementButton: {
          children: <RemoveIcon fontSize="medium" />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

const StyledInputRoot = styled("div")(
  `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
);

const StyledInput = styled("input")(
  `
  font-size: 20px;
  font-family: Archivo Black;
  line-height: 1.375;
  color: #041E42;
  bgcolor: #F7F8F9 !important;
  border: none;
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;
`
);

const StyledButton = styled("button")({
  fontSize: "20px",
  color: "#041E42",
  background: "transparent",
  border: "none",
  width: "32px",
  height: "32px",
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "center",
  alignItems: "center",
  transitionProperty: "all",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "120ms",
  boxSizing: "border-box",
  lineHeight: 1.5,

  "&:focus-visible": {
    outline: 0,
  },

  "&.increment": {
    order: 1,
  },
});

const selection = {
  bgcolor: "#F3F3F3 !important",
  border: "1px solid",
  borderColor: "#EEEEEE",
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

function SideCartCard() {
  const { data, isLoading } = useQuery("cart", getCart);
  const queryClient = useQueryClient();

  const [qty, setQty] = useState(data?.mainCart);
  const [showSelection, setShowSelection] = useState(false);
  console.log(qty);
  const handleQuantityChange = async (action, idx) => {
    if (action === "inc") {
      setQty([...qty, (qty[idx].quantity += 1)]);
    } else {
      if (qty[idx].quantity >= 2) {
        setQty([...qty, (qty[idx].quantity -= 1)]);
      }
    }

    await updateQtyPack(idx);
  };

  const handleToggleSelection = () => {
    setShowSelection(!showSelection);
  };

  const handleRemove = async (idx) => {
    await deleteSingleMainCart(idx);
    queryClient.invalidateQueries(["cart"]);
  };

  let cartItems = data?.mainCart.map((cart) => cart.items);
  // const pack = cartItems.forEach((item) => item.quantity);

  // let packPrice = 9.9;

  // switch (true) {
  //   case pack <= 2:
  //     packPrice = 9.9;
  //     break;
  //   case pack > 2 && pack <= 6:
  //     packPrice = 26.9;
  //     break;
  //   case pack > 6 && pack <= 12:
  //     packPrice = 49.9;
  //     break;
  // }

  return (
    <>
      {data &&
        cartItems?.map((c, outerIdx) => {
          let donutQuantity = 0;
          c.forEach((q) => (donutQuantity += q.quantity));
          // donutQuantity += c.quantity;

          return (
            <div key={outerIdx}>
              <Grid
                container
                sx={{
                  p: 1,
                  bgcolor: "#F7F8F9",
                  border: "1px solid",
                  borderColor: "#EEEEEE",
                  borderRadius: "10px",
                  mb: 4,
                }}
                spacing={2}
              >
                <Grid item sm={4}>
                  <img
                    src={donutGIF.src}
                    style={{
                      borderRadius: "10px",
                      width: "150px",
                      margin: "auto",
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{ mt: 1, textAlign: "center", fontWeight: "bold" }}
                  >
                    RM{" "}
                    {donutQuantity === 2
                      ? "9.90"
                      : donutQuantity === 6
                      ? "29.90"
                      : "49.90"}
                  </Typography>
                </Grid>
                <Grid item sm={8}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {donutQuantity} Pack
                  </Typography>
                  <Button
                    key={outerIdx}
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
                      {c.map((innerIdx) => {
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
                              <h6>
                                {innerIdx.product.name} x {innerIdx.quantity}
                              </h6>
                            </Typography>
                          </>
                        );
                      })}
                    </Box>
                  )}

                  <Box
                    sx={{
                      border: "1.5px solid",
                      borderRadius: "13px",
                      borderColor: "#041E42",
                      width: "180px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* <NumberInput
                      min={1}
                      max={12}
                      value={qty}
                      onValueChange={(newValue) =>
                        handleQuantityChange(newValue)
                      }
                    /> */}
                    <RemoveIcon
                      fontSize="medium"
                      onClick={() => handleQuantityChange("dec", outerIdx)}
                    />
                    <span>{qty[outerIdx].quantity}</span>
                    <AddIcon
                      fontSize="medium"
                      onClick={() => handleQuantityChange("inc", outerIdx)}
                    />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#041E42",
                      mt: 1,
                      cursor: "pointer",
                      ":hover": { color: "#D1182E", fontWeight: "bold" },
                    }}
                    onClick={() => handleRemove(outerIdx)}
                  >
                    Remove
                  </Typography>
                </Grid>
              </Grid>
            </div>
          );
        })}
    </>
  );
}

export default SideCartCard;
