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

function AddCart() {
  const { data, isLoading } = useQuery("cartItems", getCart);

  const donutCount = data?.items?.reduce(
    (initialValue, item) => (initialValue += item.quantity),
    0
  );

  const handleRemoveDonut = (index) => {
    const donutToRemove = data?.items?.[index];
    // console.log(donutToRemove);
    if (donutToRemove && donutToRemove.product?.image) {
      deleteSingleCartItem(donutToRemove.id); // Assuming you have a function to delete a single cart item by ID
      // queryClient.invalidateQueries("cartItems"); // Refresh the cartItems query
    }
  };

  const showDonuts = data?.items
    ?.flatMap((donut) => Array(donut.quantity).fill(donut))
    .map((donut, i) => (
      <Grid item md={4} key={i} sx={{ p: 1 }}>
        <Box sx={{ position: "relative" }}>
          <img
            src={`http://localhost:8000/${donut.product.image}`}
            style={{ width: "100px", borderRadius: "18px", opacity: "0.3" }}
          />
          <Box sx={{ position: "absolute", top: "-5px", right: "-2px" }}>
            <IconButton onClick={() => handleRemoveDonut(i)}>
              <CancelIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    ));

  return (
    <>
      <Grid
        sx={{
          bgcolor: "white",
          borderRadius: "22px",
          p: 2,
        }}
      >
        <Box sx={{ alignItems: "center" }}>
          <ColorToggleButton donutCount={donutCount} />
        </Box>
        <Grid container md={12}>
          {showDonuts}
        </Grid>
        <Grid
          sx={{
            bgcolor: "white",
            borderRadius: "20px",
            p: 2,
            mt: 3,
            textAlign: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid item md={6}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#F2F2F2 !important",
                  borderRadius: "13px",
                  width: "150px",
                  mb: 1,
                }}
              >
                CLEAR SELECTION
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
                  width: "150px",
                  height: "83px",
                  mb: 1,
                }}
              >
                RANDOMISE
              </Button>
              <Typography variant="subtitle1" sx={{ color: "#B5B5B5" }}>
                Can't decide? Let us choose!
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default AddCart;
