import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js"; //import loadstripe from stripe library
import { Box, Button, Typography } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { createOrder } from "@/utils/orders";
import { getCart } from "@/utils/cart";

// let stripePromise;

function Stripe({ info, flatMappedData }) {
  const queryClient = useQuery();
  const { mutate } = useMutation(createOrder, {
    onSuccess: (data) => {
      alert(data.msg);
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (e) => alert(e.response.data.msg),
  });

  const getStripe = () => {
    return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  };

  const { data } = useQuery("cart", getCart);
  const [isLoading, setLoading] = useState(false);
  const [stripeError, setStripeError] = useState(null);
  console.log(flatMappedData);
  const item = { price: "price_1ObjcjCZpgJT0cLMhpzUQbxL", quantity: 1 };

  const items = data?.mainCart
    ? flatMappedData.map((item) => {
        let price = "";
        if (item.innerQuantity === 2) price = "price_1Objc9CZpgJT0cLMuF82ltl6";
        if (item.innerQuantity === 6) price = "price_1ObjaZCZpgJT0cLMJqr5mMX0";
        if (item.innerQuantity === 12) price = "price_1ObjcjCZpgJT0cLMhpzUQbxL";

        return { price, quantity: item.outerQuantity };
      })
    : 0;

  const checkOutOptions = {
    lineItems: items,
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
    try {
      const { error } = await stripe.redirectToCheckout(checkOutOptions);
      if (error) {
        setStripeError(error.message);
      }
    } catch (error) {
      setStripeError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (stripeError) alert(stripeError);

  const handleSubmitInfo = (e) => {
    e.preventDefault();
    redirectToCheckout();
    mutate(info);
  };

  return (
    <>
      <form onSubmit={handleSubmitInfo}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "250px",
            borderRadius: "5px",
            bgcolor: "#A5C9A5 !important",
            color: "#041E42",
            my: 3,
          }}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Payment"}
        </Button>
      </form>
    </>
  );
}

export default Stripe;
