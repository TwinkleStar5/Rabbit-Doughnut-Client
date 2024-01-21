import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import donutGIF from "../../img/donutGIF.webp";
import { useState, useEffect, forwardRef } from "react";
import { addToCart } from "@/utils/cart";
import { getCart } from "@/utils/cart";
import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQueryClient } from "react-query";

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
  const [quantity, setQuantity] = useState(1);
  const [showSelection, setShowSelection] = useState(true);
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };
  const handleToggleSelection = () => {
    setShowSelection(!showSelection);
  };

  return (
    <Grid
      container
      sx={{
        p: 1,
        bgcolor: "#F7F8F9",
        border: "1px solid",
        borderColor: "#EEEEEE",
        borderRadius: "10px",
      }}
      spacing={2}
    >
      <Grid item sm={4}>
        <img
          src={donutGIF.src}
          style={{ borderRadius: "10px", width: "150px", margin: "auto" }}
        />
        <Typography
          variant="subtitle1"
          sx={{ mt: 1, textAlign: "center", fontWeight: "bold" }}
        >
          RM 26.90
        </Typography>
      </Grid>
      <Grid item sm={8}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Build A Pack - 6 Pack
        </Typography>
        <Button
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
              1. NOTORIOUS P.I.G 2. MILLIE BOBBY BROWNIE 3. D'OH NUT 4.
              DOUGHNATELLA VERSACE 5. LIAM HEMSWORTHY 6. BEN-OFFEE STILLER
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            border: "1.5px solid",
            borderRadius: "13px",
            borderColor: "#041E42",
            width: "180px",
          }}
        >
          <NumberInput
            min={1}
            max={12}
            value={quantity}
            onValueChange={(newValue) => handleQuantityChange(newValue)}
          />
        </Box>
        <Typography
          variant="subtitle1"
          sx={{ color: "#041E42", mt: 1, cursor: "pointer" }}
        >
          Remove
        </Typography>
      </Grid>
    </Grid>
  );
}

export default SideCartCard;

// function AddQuantityForm({ product }) {

//   const [cartItem, setCartItem] = useState(null);
//   const queryClient = useQueryClient();
//   const { mutate } = useMutation(addToCart, {
//     onSuccess: (data) => {
//       alert(data.msg);
//       queryClient.invalidateQueries(["cart"]);
//     },
//     onError: (e) => alert(e.response.data.msg),
//   });

//   useEffect(() => {
//     const existingCartItem = getCart().find((item) => item._id == product._id);
//     setCartItem(existingCartItem);
//   }, [product._id]);

//   const handleAddToCart = () => {
//     // Use the addToCart function or perform other actions based on the quantity
//     addToCart(product, quantity);
//     handleClose(); // Close the modal or perform other actions after adding to cart
//   };

//   return;
//   <>
//     <form method="POST" onSubmit={handleAddToCart}>
//
//       <Button
//         type="submit"
//         variant="button"
//         sx={{ mt: 3, width: "180px", borderRadius: "13px" }}
//       >
//         ADD TO CART
//       </Button>
//     </form>

//     <Button
//       onClick={() => handleAddToCart()}
//       variant="button"
//       sx={{ mt: 3, width: "180px", borderRadius: "13px" }}
//     >
//       ADD TO CART
//     </Button>
//   </>;
// }

// export default AddQuantityForm;
