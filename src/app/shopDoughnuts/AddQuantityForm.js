import { useState, useEffect, forwardRef } from "react";
import AddCart from "../cart/AddCart";
import { addToCart } from "@/utils/cart";
import { getCart } from "@/utils/cart";
import { Unstable_NumberInput as BaseNumberInput } from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { Button } from "@mui/material";

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
  font-size: 25px;
  font-family: Archivo Black;
  font-weight: 400;
  line-height: 1.375;
  color: #041E42;
  border: none;
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;
  transitionProperty: all,
  transitionDuration: 120ms,
`
);

const StyledButton = styled("button")({
  fontSize: "20px",
  color: "white",
  background: "#041E42",
  borderRadius: "12px",
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

function AddQuantityForm({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [cartItem, setCartItem] = useState(null);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(addToCart, {
    onSuccess: (data) => {
      alert(data.msg);
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (e) => alert(e.response.data.msg),
  });

  const { data } = useQuery("cartItems", getCart);
  // useEffect(() => {
  //   const existingCartItem = getCart().find((item) => item._id == product._id);
  //   setCartItem(existingCartItem);
  // }, [product._id]);
  const donutCount = data?.items?.reduce(
    (initialValue, item) => (initialValue += item.quantity),
    0
  );

  const handleAddToCart = () => {
    // Use the addToCart function or perform other actions based on the quantity

    mutate({ productId: product._id, quantity });
    //handleClose(); // Close the modal or perform other actions after adding to cart
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  return (
    <>
      {/* <form method="POST" onSubmit={handleAddToCart}>
        <NumberInput
          min={1}
          max={12}
          value={quantity}
          onValueChange={(newValue) => handleQuantityChange(newValue)}
        />
        <Button
          type="submit"
          variant="button"
          sx={{ mt: 3, width: "180px", borderRadius: "13px" }}
        >
          ADD TO CART
        </Button>
      </form> */}

      <Button
        onClick={() => handleAddToCart()}
        variant="button"
        sx={{ mt: 3, width: "180px", borderRadius: "13px" }}
        disabled={donutCount > 11 ? true : false}
      >
        ADD TO CART
      </Button>
    </>
  );
}

export default AddQuantityForm;
