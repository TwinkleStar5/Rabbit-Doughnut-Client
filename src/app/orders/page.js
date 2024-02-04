"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import OrderTable from "./OrderTable";
import { useRouter } from "next/navigation";
import { getSingleOrder } from "@/utils/orders";
import { useQuery } from "react-query";

function Orders() {
  const { push } = useRouter();
  const { data, isLoading } = useQuery("orders", getSingleOrder);
  console.log(data);
  return (
    <>
      {isLoading ? (
        <Typography variant="h2">Is Loading</Typography>
      ) : (
        <Grid container>
          {data ? (
            <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
              <Grid
                item
                sx={{
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                <Typography
                  variant="h4"
                  textAlign="center"
                  sx={{ my: 3, color: "#041E42" }}
                >
                  You have currently no orders.
                </Typography>
                <Button
                  variant="button"
                  sx={{
                    borderRadius: "13px",
                    margin: "auto",
                    mb: 3,
                    width: "270px",
                  }}
                  centerRipple
                  onClick={() => push("/shopDoughnuts")}
                >
                  Shop Your Doughnuts Here!
                </Button>
              </Grid>
            </Box>
          ) : (
            <Grid item sx={{ width: "800px", margin: "auto", mb: 5 }}>
              <Typography
                variant="h2"
                sx={{ textAlign: "center", margin: "auto", my: 3 }}
              >
                Order History
              </Typography>
              <OrderTable />
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}

export default Orders;
