"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, Grid, Input, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import AddQuantityForm from "./AddQuantityForm";
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

const dietaryCaption = {
  bgcolor: "white",
  opacity: "0.5",
  textAlign: "center",
  borderRadius: "20px",
  position: "absolute",
  bottom: "0",
  width: "100%",
  borderBottomLeftRadius: "0",
  borderBottomRightRadius: "0",
};

function ShopProductCard({ product }) {
  const [open, setOpen] = useState(null);

  const handleOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => setOpen(null);

  return (
    <>
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
          <Box sx={{ position: "relative" }}>
            <CardMedia
              height="130"
              component="img"
              image={`http://localhost:8000/${product.image}`}
            />
            {product.vegan && product.glutenFree ? (
              <Typography variant="subtitle1" sx={dietaryCaption}>
                Vegan & Gluten Free
              </Typography>
            ) : product.vegan ? (
              <Typography variant="subtitle1" sx={dietaryCaption}>
                Vegan
              </Typography>
            ) : product.glutenFree ? (
              <Typography variant="subtitle1" sx={dietaryCaption}>
                Gluten Free
              </Typography>
            ) : (
              ""
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
                        <Typography variant="subtitle1" sx={dietaryCaption}>
                          Vegan & Gluten Free
                        </Typography>
                      ) : product.vegan ? (
                        <Typography variant="subtitle1" sx={dietaryCaption}>
                          Vegan
                        </Typography>
                      ) : product.glutenFree ? (
                        <Typography variant="subtitle1" sx={dietaryCaption}>
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
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Contains:
                    </Typography>
                    <Typography variant="h6" sx={{ lineHeight: "normal" }}>
                      {product.allergens}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Modal>
            <Box>
              <AddQuantityForm product={product} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default ShopProductCard;
