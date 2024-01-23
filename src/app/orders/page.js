"use client";

import { Button, Grid, Typography } from "@mui/material";
import OrderTable from "./OrderTable";
import { useRouter } from "next/navigation";
function Orders() {
  const { push } = useRouter();

  return (
    <>
      <Grid container>
        <Grid item sx={{ textAlign: "center", margin: "auto" }}>
          <Typography
            variant="h4"
            textAlign="center"
            sx={{ my: 3, color: "#041E42" }}
          >
            You have currently no orders.
          </Typography>
          <Button
            variant="button"
            sx={{ borderRadius: "13px", margin: "auto", mb: 3 }}
            onClick={() => push("/shopDoughnuts")}
          >
            Shop Your Doughnuts Here!
          </Button>
        </Grid>
        <Grid item sx={{ width: "800px", margin: "auto", mb: 5 }}>
          <Typography
            variant="h2"
            sx={{ textAlign: "center", margin: "auto", my: 3 }}
          >
            Order History
          </Typography>
          <OrderTable />
        </Grid>
      </Grid>
    </>
  );
}

export default Orders;
