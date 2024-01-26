"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import revenueData from "./data/revenueData.json";
import RecentOrders from "./AllOrders";
import { Grid } from "@mui/material";
import Chart from "./chart";
import "../globals.css";
import CreateProductTable from "./ProductTable";

function Dashboard() {
  return (
    <>
      <Grid container sx={{ p: 5 }}>
        <Grid container sx={{ margin: "auto" }}>
          <Grid item md={8}>
            <Typography variant="h4">Line Chart</Typography>
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
          <Grid
            item
            md={3}
            sx={{ border: "1.5px dashed", borderRadius: "16px", p: 2 }}
          >
            <Typography variant="h5">Total Revenue</Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              as of 16 Feb 2024
            </Typography>
            <Typography variant="h4" sx={{ color: "#9381ff" }}>
              RM12,346.97
            </Typography>
          </Grid>
        </Grid>
        <Grid item sx={{ my: 4, mx: "auto" }}>
          <Typography variant="h4">Recent Orders</Typography>
          <RecentOrders />
        </Grid>
        <Grid sx={{ my: 4, mx: "auto" }}>
          <Typography variant="h4" sx={{ my: 1 }}>
            All Doughnuts Menu
          </Typography>
          <CreateProductTable />
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
