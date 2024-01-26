import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  useTheme,
  IconButton,
} from "@mui/material";
import build from "../../img/build_placeholder.webp";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { addToCart, getCart, deleteSingleCartItem } from "@/utils/cart";
import { useQuery } from "react-query";
import { data } from "autoprefixer";
import CancelIcon from "@mui/icons-material/Cancel";

function ColorToggleButton({ donutCount }) {
  console.log(donutCount);
  const [alignment, setAlignment] = useState("web");
  const handleChange = (event, newAlignment) => {
    console.log(newAlignment);
    setAlignment(newAlignment);
  };
  const theme = useTheme();
  const toggleStyle = {
    bgcolor: "white !important",
    width: "115px",
    height: "60px",
    textAlign: "center",
    borderRadius: "12px",
    border: "none",
    [theme.breakpoints.down("sm")]: {
      width: "70px",
    },
  };
  return (
    <ToggleButtonGroup
      color="info"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton
        sx={toggleStyle}
        value="2 Pack"
        selected={donutCount <= 2 ? true : false}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            [theme.breakpoints.down("sm")]: {
              fontSize: "12px",
            },
          }}
        >
          2 Pack
        </Typography>
      </ToggleButton>
      <ToggleButton
        sx={toggleStyle}
        value="6 Pack"
        selected={donutCount > 2 && donutCount <= 6 ? true : false}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            [theme.breakpoints.down("sm")]: {
              fontSize: "12px",
            },
          }}
        >
          6 Pack
        </Typography>
      </ToggleButton>
      <ToggleButton
        sx={toggleStyle}
        value="12 Pack"
        selected={donutCount > 6 ? true : false}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            [theme.breakpoints.down("sm")]: {
              fontSize: "12px",
            },
          }}
        >
          12 Pack
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

const toggleButton = {
  bgcolor: "white !important",
  color: "info.main",
  width: "100%",
  height: "60px",
  textAlign: "center",
  border: "none",
  fontSize: "18px",
  fontWeight: "bold",
  fontFamily: "Work Sans",
};

function AddCart() {
  const { data, isLoading } = useQuery("cartItems", getCart);
  //This is a React Query hook that is used for fetching and managing data.
  const donutCount = data?.items?.reduce(
    (initialValue, item) => (initialValue += item.quantity),
    0
  );

  const showDonuts =
    data?.items > 0 ? (
      data?.items
        ?.flatMap((donut) => Array(donut.quantity).fill(donut))
        .map((donut, i) => (
          <Grid item md={4} key={i} sx={{ p: 1 }}>
            <Box sx={{ position: "relative" }}>
              <img
                src={`http://localhost:8000/${donut.product.image}`}
                style={{ width: "100px", borderRadius: "18px" }}
              />
              <Box sx={{ position: "absolute", top: "-5px", right: "-2px" }}>
                <IconButton onClick={() => handleRemoveDonut(i)}>
                  <CancelIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))
    ) : (
      <Grid item md={4} sx={{ p: 1 }}>
        <img
          src={build.src}
          style={{ width: "100px", borderRadius: "18px", opacity: "0.3" }}
        />
      </Grid>
    );

  // const showDonuts = data?.items
  //   ?.flatMap((donut) => Array(donut.quantity).fill(donut))
  //   .map((donut, i) => (
  //     <Grid item md={4} key={i} sx={{ p: 1 }}>
  //       <Box sx={{ position: "relative" }}>
  //         <img
  //           src={`http://localhost:8000/${donut.product.image}`}
  //           style={{ width: "100px", borderRadius: "18px", opacity: "0.3" }}
  //         />
  //         <Box sx={{ position: "absolute", top: "-5px", right: "-2px" }}>
  //           <IconButton onClick={() => handleRemoveDonut(i)}>
  //             <CancelIcon />
  //           </IconButton>
  //         </Box>
  //       </Box>
  //     </Grid>
  //   ));

  const handleRemoveDonut = (i) => {
    console.log(i);
    deleteSingleCartItem(i);
  };

  const handleRemoveAll = () => {};

  const handleAddToCart = () => {};

  const [pack, setPack] = useState(null);
  const handlePackChange = (value) => {
    setPack(value);
  };
  return (
    <>
      <Grid
        container
        md={12}
        sx={{
          bgcolor: "white",
          borderRadius: "20px",
          p: 2,
          mt: 3,
          textAlign: "center",
        }}
      >
        {/* <Grid item sx={{ alignItems: "center", width: "100%" }}>
          <ColorToggleButton donutCount={donutCount} />
        </Grid> */}
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Button sx={toggleButton} onClick={() => handlePackChange("2 Pack")}>
            2 Pack
          </Button>
          <Button sx={toggleButton} onClick={() => handlePackChange("6 Pack")}>
            6 Pack
          </Button>
          <Button sx={toggleButton} onClick={() => handlePackChange("12 Pack")}>
            12 Pack
          </Button>
        </Grid>
        <Grid
          md={12}
          item
          sx={{
            bgcolor: "white",
            borderRadius: "22px",
            p: 2,
          }}
        >
          {showDonuts}
        </Grid>
        <Grid item md={12}>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "space-around" }}
            spacing={2}
          >
            <Grid item md={6}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#F2F2F2 !important",
                  borderRadius: "13px",
                  width: "100%",
                  mb: 1,
                  p: 2,
                }}
                disableElevation
                onClick={() => handleRemoveAll}
              >
                CLEAR ALL
              </Button>
              <Typography variant="subtitle1" sx={{ color: "#B5B5B5" }}>
                Remove your selected doughnuts
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Button
                variant="button"
                sx={{
                  borderRadius: "13px",
                  width: "100%",
                  mb: 1,
                  p: 2,
                }}
              >
                RANDOMISE
              </Button>
              <Typography variant="subtitle1" sx={{ color: "#B5B5B5" }}>
                Can't decide? Let us choose!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          bgcolor: "white",
          borderRadius: "22px",
          p: 3,
          justifyContent: "space-between",
          mt: 3,
        }}
      >
        <Grid item md={5} sx={{ pr: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: "info.main",
              pt: 1,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            RM26.90
          </Typography>
        </Grid>
        <Grid item md={7}>
          <Button
            onClick={() => handleAddToCart()}
            variant="button"
            sx={{ width: "100%", borderRadius: "13px" }}
          >
            ADD TO CART
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default AddCart;
