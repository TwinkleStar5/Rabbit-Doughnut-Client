"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import revenueData from "./data/revenueData.json";
import RecentOrders from "./AllOrders";
import { Grid } from "@mui/material";
import Chart from "./chart";

function Dashboard() {
  return (
    <>
      <Grid
        sx={{
          p: 5,
          textAlign: "center",
        }}
      >
        <Grid item>
          <Typography variant="h3">Line Chart</Typography>
          <Chart />
          {/* <Box sx={{ width: "800px", margin: "auto", my: 3 }}>
            <Line
              data={{
                labels: revenueData.map((data) => data.label),
                datasets: [
                  {
                    label: "Revenue",
                    data: revenueData.map((data) => data.revenue),
                    backgroundColor: "#064FF0",
                    borderColor: "#064FF0",
                  },
                  {
                    label: "Cost",
                    data: revenueData.map((data) => data.cost),
                    backgroundColor: "#FF3030",
                    borderColor: "#FF3030",
                  },
                ],
              }}
              options={{
                elements: {
                  line: {
                    tension: 0.5,
                  },
                },
                plugins: {
                  title: {
                    text: "Monthly Revenue & Cost",
                  },
                },
              }}
            />
          </Box> */}
        </Grid>
        <Grid item>
          <RecentOrders />
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
