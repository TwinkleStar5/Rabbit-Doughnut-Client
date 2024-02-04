import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { createOrder } from "@/utils/orders";
import { Button } from "@mui/material";

const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Payment_Button = ({ amount = 1, info }) => {
  const router = useRouter();

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

  const handler = async () => {
    try {
      const stripe = await asyncStripe;
      const res = await fetch("/api/stripe/session", {
        method: "POST",
        body: JSON.stringify({
          amount,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const { sessionId } = await res.json();

      const { error } = await stripe.redirectToCheckout({ sessionId });
      console.log(error);
      if (error) {
        router.push("/error");
      }
    } catch (err) {
      console.log(err);
      router.push("/error");
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
        onClick={handler}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Payment"}
      </Button>
    </form>
  );
};

export default Payment_Button;
