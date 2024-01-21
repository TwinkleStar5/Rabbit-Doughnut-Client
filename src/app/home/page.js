"use client";

import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  useTheme,
} from "@mui/material";

import homeBanner from "../../img/home_banner.webp";
import worked_with from "../../img/worked-with.webp";
import discount from "../../img/discount.webp";
import { useRouter } from "next/navigation";

function Home() {
  const { push } = useRouter();
  const theme = useTheme();
  return (
    <>
      <Box sx={{ overflow: "hidden" }}>
        <Grid
          container
          columns={{ md: 10 }}
          sx={{ bgcolor: "#ADDFB3", pb: 11, pt: 3, px: 3 }}
        >
          <Grid item md={5}>
            <Box>
              <Typography
                variant="h1"
                sx={{
                  color: "white",
                  fontSize: "100px",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "80px",
                  },
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "60px",
                  },
                }}
              >
                Choose Your Own Doughnuts
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Button
                onClick={() => push("/shopDoughnuts")}
                variant="button"
                sx={{
                  my: 3,
                  borderRadius: "13px",
                }}
              >
                Order Now
              </Button>
            </Box>
          </Grid>
          <Grid item md={5}>
            <Box>
              <img src={homeBanner.src} style={{ width: "600px" }} />
            </Box>
          </Grid>
          <Grid item>
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                We've worked with...
              </Typography>
              <img src={worked_with.src} style={{ width: "580px" }} />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ p: 5 }}>
          <Grid item md={8}>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  mb: 2,
                  [theme.breakpoints.down("md")]: {
                    fontSize: "40px",
                  },
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "35px",
                  },
                }}
              >
                THE MOST INDULGENT, HANDMADE DONUTS!
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  mb: 2,
                  [theme.breakpoints.down("md")]: {
                    fontSize: "15px",
                  },
                }}
              >
                At Rabbit Doughnuts, we want people to indulge in the most
                high-quality donuts you’ve ever tasted. We guarantee you’ll
                enjoy our creations as a lot of time and love is put into each
                and every batch. All of our donuts are handmade using quality
                flour from Shipton Mill. We fry the donuts until they’re
                superbly golden, roll them in sugar and stuff with
                mouth-watering fillings.
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "15px",
                  },
                }}
              >
                Whether you choose to fill your donut with raspberry jam, creme
                patisserie or chocolate ganache you will not be disappointed!
                All the ingredients are of the finest quality, and every bit of
                dough and fillings are made by hand every day.
              </Typography>
            </Box>
          </Grid>

          <Grid item md={4}>
            <Box
              sx={{
                p: 5,
              }}
            >
              <img
                src={discount.src}
                style={{
                  width: "300px",
                  borderRadius: "50%",
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid item sx={{ textAlign: "center", p: 4, bgcolor: "#FABBCB" }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              GET 20% OFF YOUR FIRST ONLINE ORDER!
            </Typography>
            <Box
              sx={{
                margin: "auto",
                my: 3,
              }}
            >
              <a href="/register">
                <Button variant="button" sx={{ borderRadius: "13px" }}>
                  REGISTER NOW
                </Button>
              </a>
            </Box>
            <Typography variant="h5">
              If you have registered,{" "}
              <a href="/login" style={{ textDecoration: "underline" }}>
                LOGIN NOW
              </a>{" "}
              to collect points as you shop for more doughnuts
            </Typography>
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
