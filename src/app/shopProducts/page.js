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
  maxHeight: "60vh",
  overflowY: "auto",
  // width: 800,
  // height: 350,
  bgcolor: "background.paper",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const label = { inputProps: { "aria-label": "Switch demo" } };

function ShopProducts() {
  const { data, isLoading } = useQuery("products", getProducts);
  const [open, setOpen] = React.useState(null);
  const handleOpen = (id) => {
    setOpen(id);
  };
  const handleClose = () => setOpen(null);
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
                    <CardActionArea
                      onClick={() => handleOpen(product._id)}
                      sx={{
                        borderBottomLeftRadius: "0",
                        borderBottomRightRadius: "0",
                      }}
                    >
                      <Box style={{ position: "relative" }}>
                        {product.vegan && product.glutenFree ? (
                          <>
                            <CardMedia
                              height="130"
                              component="img"
                              image={`http://localhost:8000/${product.image}`}
                            />
                            <Typography
                              variant="subtitle1"
                              sx={{
                                bgcolor: "white",
                                opacity: "0.5",
                                textAlign: "center",
                                borderRadius: "20px",
                                position: "absolute",
                                bottom: "0",
                                width: "100%",
                                borderBottomLeftRadius: "0",
                                borderBottomRightRadius: "0",
                              }}
                            >
                              Vegan & Gluten Free
                            </Typography>
                          </>
                        ) : product.vegan ? (
                          <>
                            <CardMedia
                              height="130"
                              component="img"
                              image={`http://localhost:8000/${product.image}`}
                            />
                            <Typography
                              variant="subtitle1"
                              sx={{
                                bgcolor: "white",
                                opacity: "0.5",
                                textAlign: "center",
                                borderRadius: "20px",
                                position: "absolute",
                                bottom: "0",
                                width: "100%",
                                borderBottomLeftRadius: "0",
                                borderBottomRightRadius: "0",
                              }}
                            >
                              Vegan
                            </Typography>
                          </>
                        ) : product.glutenFree ? (
                          <>
                            <CardMedia
                              height="130"
                              component="img"
                              image={`http://localhost:8000/${product.image}`}
                            />
                            <Typography
                              variant="subtitle1"
                              sx={{
                                bgcolor: "white",
                                opacity: "0.5",
                                textAlign: "center",
                                borderRadius: "20px",
                                position: "absolute",
                                bottom: "0",
                                width: "100%",
                                borderBottomLeftRadius: "0",
                                borderBottomRightRadius: "0",
                              }}
                            >
                              Gluten Free
                            </Typography>
                          </>
                        ) : (
                          <>
                            <CardMedia
                              height="130"
                              component="img"
                              image={`http://localhost:8000/${product.image}`}
                            />
                          </>
                        )}
                      </Box>
                    </CardActionArea>
                    <CardContent>
                      <Box textAlign="center">
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ fontSize: "20px" }}
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          onClick={() => handleOpen(product._id)}
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          Allergens
                        </Typography>
                        <Modal
                          open={open == product._id}
                          sx={{
                            overflow: "none",
                          }}
                        >
                          <Box sx={style}>
                            <CloseIcon
                              onClick={handleClose}
                              sx={{
                                position: "relative",
                                zIndex: 9999,
                                cursor: "pointer",
                              }}
                            />
                            <Grid container spacing={3}>
                              <Grid item md={6}>
                                <Box
                                  sx={{
                                    position: "relative",
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                  }}
                                >
                                  <img
                                    style={{
                                      padding: "22px",
                                      borderRadius: "42px",
                                      marginBottom: "-20px",
                                    }}
                                    src={`http://localhost:8000/${product.image}`}
                                  />
                                  {product.vegan && product.glutenFree ? (
                                    <Typography
                                      variant="subtitle1"
                                      sx={{
                                        bgcolor: "white",
                                        opacity: "0.5",
                                        textAlign: "center",
                                        borderRadius: "20px",
                                        position: "absolute",
                                        bottom: "0",
                                        width: "100%",
                                      }}
                                    >
                                      Vegan & Gluten Free
                                    </Typography>
                                  ) : product.vegan ? (
                                    <Typography
                                      variant="subtitle1"
                                      sx={{
                                        bgcolor: "white",
                                        opacity: "0.5",
                                        textAlign: "center",
                                        borderRadius: "20px",
                                        position: "absolute",
                                        bottom: "0",
                                        width: "100%",
                                      }}
                                    >
                                      Vegan
                                    </Typography>
                                  ) : product.glutenFree ? (
                                    <Typography
                                      variant="subtitle1"
                                      sx={{
                                        bgcolor: "white",
                                        opacity: "0.5",
                                        textAlign: "center",
                                        borderRadius: "20px",
                                        position: "absolute",
                                        bottom: "0",
                                        width: "100%",
                                      }}
                                    >
                                      Gluten Free
                                    </Typography>
                                  ) : (
                                    ""
                                  )}
                                </Box>
                              </Grid>

                              <Grid item md={6} sx={{ mt: 3 }}>
                                <Typography variant="h5" sx={{ mb: 1 }}>
                                  {product.name}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  sx={{ mb: 3, lineHeight: "normal" }}
                                >
                                  {product.description}
                                </Typography>
                                <Typography
                                  variant="h6"
                                  sx={{ fontWeight: "bold" }}
                                >
                                  Contains:
                                </Typography>
                                <Typography
                                  variant="h6"
                                  sx={{ lineHeight: "normal" }}
                                >
                                  {product.allergens}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Modal>
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
