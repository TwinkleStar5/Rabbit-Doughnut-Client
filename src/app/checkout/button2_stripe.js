import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@mui/material";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function PreviewPage() {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <form action="/checkout/stripe2" method="POST">
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
        // disabled={isLoading}
      >
        Payment
      </Button>
      {/* <button type="submit" role="link">
          Checkout
        </button> */}
    </form>
  );
}
