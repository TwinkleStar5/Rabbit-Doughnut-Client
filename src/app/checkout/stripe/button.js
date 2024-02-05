"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createOrder } from "@/utils/orders";
import { Button } from "@mui/material";
import { redirect } from "next/navigation";
import axios from "axios";

const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Payment_Button = ({ amount = 1, info }) => {
  // const router = useRouter();
  const queryClient = useQueryClient();
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
    handler();
  };

  const handler = async () => {
    try {
      const stripe = await asyncStripe;
      let data = {
        amount: 123,
      };
      // const res = await fetch("./stripe_session", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });

      const res = await axios.post(
        "http://localhost:3000/checkout/stripe/stripe_session",
        data
      );
      return console.log(res);

      const { sessionId } = await res.json();

      const { error } = await stripe.redirectToCheckout({ sessionId });
      console.log(error);
      if (error) {
        redirect("/error");
      }
    } catch (err) {
      console.log(err);
      // redirect("/error");
    }
  };

  return (
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
        // disabled={isLoading}
      >
        Payment
      </Button>
    </form>
  );
};

export default Payment_Button;
