import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js"; //import loadstripe from stripe library
import { Box, Button, Typography } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { createOrder } from "@/utils/orders";

let stripePromise;
//makes sure that the Stripe library is fully prepared and set up for handling payments before the rest of our code tries to use it. The code we provided makes sure this preparation only happens once and then reuses it, which is a good way to keep things efficient and speedy in our web application.

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
};

function Stripe({ info }) {
  const queryClient = useQuery();
  const { mutate } = useMutation(createOrder, {
    onSuccess: (data) => {
      alert(data.msg);
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (e) => alert(e.response.data.msg),
  });

  const handleSubmitInfo = (e) => {
    e.preventDefault();
    mutate(info);
  };

  const [isLoading, setLoading] = useState(false);
  const [stripeError, setStripeError] = useState(null);

  const product = { prod: "prod_PQamm9vf7v1YYb" };
  const checkOutOptions = {
    mode: "payment", //Payment Mode: It indicates that the intention is to make a payment.
    successUrl: `${window.location.origin}/success`, //Success URL: Where to go after a successful payment.
    cancelUrl: `${window.location.origin}/cancel`, //Cancel URL: Where to go if the user decides to cancel the payment.
  };
  const redirectToCheckout = async () => {
    setLoading(true);
    const stripe = await getStripe(); //wait for getStripe function to finish before proceeding with the code below
    console.log(stripe);
    const { error } = await stripe.redirectToCheckout(checkOutOptions);
    console.log("Stripe checkout error", error);
    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);
  return (
    <>
      <form onSubmit={handleSubmitInfo}>
        <Button
          variant="contained"
          sx={{
            width: "250px",
            borderRadius: "5px",
            bgcolor: "#A5C9A5 !important",
            color: "#041E42",
            my: 3,
          }}
          onClick={handleSubmitInfo}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Payment"}
        </Button>
      </form>
    </>
  );
}

export default Stripe;
