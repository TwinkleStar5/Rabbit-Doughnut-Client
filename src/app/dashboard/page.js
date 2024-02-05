"use client";
import React from "react";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import revenueData from "./data/revenueData.json";
import RecentOrders from "./AllOrders";
import { Grid } from "@mui/material";
import Chart from "./chart";
import "../globals.css";
import CreateProductTable from "./ProductTable";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled } from "@mui/material/styles";
import "../globals.css";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const currentDate = new Date().toLocaleDateString("en-gb", {
  day: "numeric",
  year: "numeric",
  month: "short",
});

function Dashboard() {
  return (
    <>
      <Grid container sx={{ p: 5 }}>
        <Grid container sx={{ margin: "auto", mb: 5, width: "100%" }}>
          {/* <Grid item md={8} sx={{ width: "100%" }}>
            <Typography
              variant="h4"
              sx={{ color: "#2B2A4C", textAlign: "center", mb: 3 }}
              className="dashboardTitle"
            >
              LINE CHART
            </Typography>

            <Chart />
            <Box sx={{ width: "800px", margin: "auto", my: 3 }}>
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
          </Box>
          </Grid> */}
          <Grid item md={8}></Grid>
          <Grid item md={3} sx={{ width: "100%" }}>
            <Paper
              item
              md={3}
              sx={{
                border: "1.5px dashed",
                borderRadius: "16px",
                p: 2,
                textAlign: "center",
                bgcolor: "#FBECB2",
              }}
              elevation={4}
            >
              <Typography
                variant="h5"
                sx={{ color: "#2B2A4C", mb: 1 }}
                className="dashboardTitle"
              >
                TOTAL REVENUE
              </Typography>

              <Typography
                variant="h6"
                sx={{ mb: 2 }}
                className="dashboardTitle"
              >
                as of {currentDate}
              </Typography>
              <Typography
                variant="h4"
                sx={{ color: "#d14081" }}
                className="dashboardTitle"
              >
                RM12,346.97
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Root>
          <Divider>
            <Typography
              variant="h4"
              sx={{ color: "#2B2A4C", textAlign: "center", mb: 3 }}
              className="dashboardTitle"
            >
              RECENT ORDERS
            </Typography>
          </Divider>
        </Root>
        <Grid
          item
          sx={{
            mb: 10,
            mt: 4,
            mx: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
          md={8}
        >
          <RecentOrders />
        </Grid>
        <Root>
          <Divider>
            <Typography
              variant="h4"
              sx={{ color: "#2B2A4C", textAlign: "center" }}
              className="dashboardTitle"
            >
              ALL DOUGHNUTS MENU
            </Typography>
          </Divider>
        </Root>
        <Grid
          item
          sx={{
            mt: 4,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            margin: "auto",
          }}
          md={8}
        >
          <Box sx={{ my: 3 }}>
            <Button
              className="addDonutButton"
              variant="contained"
              sx={{
                bgcolor: "#2B2A4C !important",
                color: "#FBECB2",
                width: "280px !important",
                borderRadius: "16px",
              }}
            >
              <a href="/dashboard/CreateProduct">
                <AddCircleIcon sx={{ mr: 2 }} /> Add Doughnuts
              </a>
            </Button>
          </Box>
          <CreateProductTable />
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
