"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  Grid,
  Modal,
  useTheme,
} from "@mui/material";
import { useQuery } from "react-query";
import { getProducts } from "@/utils/products";
import Switch from "@mui/material/Switch";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CloseIcon from "@mui/icons-material/Close";
import AddCart from "../cart/AddCart";

const imgCaption = {
  color: "white",
  width: "100%",
  height: "10%",
  position: "absolute",
  bottom: "0%",
  backgroundColor: "white",
  opacity: "0.5",
  textAlign: "center",
  borderRadiusTop: "10px",
};
function ColorToggleButton() {
  const [alignment, setAlignment] = React.useState("web");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const theme = useTheme();

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton
        sx={{
          bgcolor: "white !important",
          width: "100px",
          textAlign: "center",
          borderRadius: "12px",
          border: "none",
          [theme.breakpoints.down("sm")]: {
            width: "70px",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            [theme.breakpoints.down("sm")]: {
              fontSize: "12px",
            },
          }}
        >
          All
        </Typography>
      </ToggleButton>
      <ToggleButton
        sx={{
          bgcolor: "white !important",
          width: "100px",
          textAlign: "center",
          borderRadius: "12px",
          border: "none",
          [theme.breakpoints.down("sm")]: {
            width: "70px",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            [theme.breakpoints.down("sm")]: {
              fontSize: "12px",
            },
          }}
        >
          Vegan
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const label = { inputProps: { "aria-label": "Switch demo" } };

function ShopProducts() {
  const { data, isLoading } = useQuery("products", getProducts);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  if (isLoading) return <Typography variant="h2">Is Loading...</Typography>;

  return (
    <>
      <Box sx={{ p: 5, bgcolor: "#F2F2F2" }}>
        <Grid container spacing={3}>
          <Grid item md={8}>
            <Box
              sx={{ display: "flex", mb: 4, justifyContent: "space-between" }}
            >
              <Box>
                <ColorToggleButton />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  [theme.breakpoints.down("sm")]: {
                    ml: "15px",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "12px",
                    },
                  }}
                >
                  Gluten Free
                </Typography>
                <Switch {...label} />
              </Box>
            </Box>
            <Grid container spacing={2}>
              {data?.map((product) => (
                <Grid item md={4} key={product._id}>
                  <Card
                    key={product._id}
                    sx={{
                      width: "100%",
                      borderRadius: "20px",
                      border: "none",
                      mb: 3,
                    }}
                  >
                    <CardActionArea onClick={handleOpen}>
                      {product?.vegan ? (
                        <Box sx={{ imgCaption }}>
                          <CardMedia
                            height="130"
                            component="img"
                            image={`http://localhost:8000/${product.image}`}
                          />
                          <Typography
                            variant="subtitle1"
                            sx={{
                              backgroundColor: "white",
                              opacity: "0.5",
                              borderRadius: "10px",
                              padding: "5px",
                              textAlign: "center",
                            }}
                          >
                            Vegan
                          </Typography>
                        </Box>
                      ) : (
                        <CardMedia
                          height="130"
                          component="img"
                          image={`http://localhost:8000/${product.image}`}
                        />
                      )}
                    </CardActionArea>
                    <CardContent>
                      <Box textAlign="center">
                        <Typography gutterBottom variant="h5" component="div">
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          onClick={handleOpen}
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          Allergens
                        </Typography>
                        {/* <Modal open={open} sx={{ p: 4 }}>
                        <CloseIcon onClose={handleClose} />
                          <Grid container spacing={3}>
                            <Grid item md={6}>
                              {product.image}
                            </Grid>
                            <Grid item md={6}>
                              <Typography variant="h5">
                                {product.name}
                              </Typography>
                              <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold" }}
                              >
                                Contains:
                              </Typography>
                              <Typography variant="h6">
                                {product.allergens}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-description"
                              sx={{ mt: 2 }}
                            >
                              {product.description}
                            </Typography>
                          </Box>
                        </Modal> */}
                        <Button
                          variant="button"
                          sx={{ mt: 3, width: "180px", borderRadius: "13px" }}
                        >
                          ADD
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item md={4}>
            <AddCart />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ShopProducts;
