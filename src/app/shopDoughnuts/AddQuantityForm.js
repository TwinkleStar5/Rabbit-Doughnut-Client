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
import BlockIcon from "@mui/icons-material/Block";
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
  const queryClient = useQueryClient(); //to create an instance of the query client in a React component. create an instance means setting up a query client object that can be used to interact with and manage queries.
  const { mutate } = useMutation(addToCart, {
    //{ mutate } is a destructuring assignment. It is extracting the property mutate from the object returned by useMutation hook.
    //addToCart => //Explanation: addToCart is the function that will be called when the mutate function is invoked. //Purpose: It's the logic that performs the actual mutation, in this case, adding an item to the cart.
    onSuccess: (data) => {
      alert(data.msg);
      queryClient.invalidateQueries(["cart"]);
      //instructing the queryClient to mark the "cart" query as stale, so that the next time the "cart" query is requested, React Query will automatically refetch the data, ensuring it is up-to-date. This is a common pattern used to trigger a data refresh in response to a mutation or other data-changing operation.
    },
    onError: (e) => alert(e.response.data.msg),
  });

  const { data } = useQuery("cartItems", getCart);
  const donutCount = data?.items?.reduce(
    (initialValue, item) => (initialValue += item.quantity),
    0
  );

  const handleAddToPlaceholder = () => {
    mutate({ productId: product._id, quantity });
  };
  //Calls the mutate function to trigger a mutation.
  // The argument passed to mutate is an object with properties productId and quantity.
  // productId: The ID of the product being added to the cart
  // quantity: The quantity of the product to be added to the cart

  // const handleQuantityChange = (newQuantity) => {
  //   setQuantity(newQuantity);
  // };

  return (
    <>
      {donutCount > 11 ? (
        <Button
          variant="button"
          sx={{
            mt: 3,
            width: "180px",
            bgcolor: "#EEEEEE !important",
            border: "1.5px solid",
            borderRadius: "13px ",
            borderColor: "#041E42 !important",
            color: "#B5B5B5 !important",
            cursor: "not-allowed !important",
          }}
          disabled
        >
          ADD
        </Button>
      ) : (
        <Button
          onClick={() => handleAddToPlaceholder()}
          variant="button"
          sx={{ mt: 3, width: "180px", borderRadius: "13px" }}
        >
          ADD
        </Button>
      )}

      {/* <form method="POST" onSubmit={handleAddToCart}>
        <NumberInput
          min={1}
          max={12}
          value={quantity}
          onValueChange={(newValue) => handleQuantityChange(newValue)}
        />
      </form> */}
    </>
  );
}

export default AddQuantityForm;
