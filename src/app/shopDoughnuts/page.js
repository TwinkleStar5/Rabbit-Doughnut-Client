"use client";

import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid, useTheme } from "@mui/material";
import { useQuery } from "react-query";
import { getProducts } from "@/utils/products";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AddCart from "../cart/AddCart";
import ShopProductCard from "./ShopProductCard";

function ColorToggleButton({ handleCategory }) {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const theme = useTheme();
  const toggleStyle = {
    bgcolor: "white !important",
    width: "150px",
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
        value="All"
        onClick={() => handleCategory("All")}
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
          All
        </Typography>
      </ToggleButton>
      <ToggleButton
        sx={toggleStyle}
        value="Vegan"
        onClick={() => handleCategory("Vegan")}
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
          Vegan
        </Typography>
      </ToggleButton>
      <ToggleButton
        sx={toggleStyle}
        value="Gluten Free"
        onClick={() => handleCategory("Gluten Free")}
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
          Gluten Free
        </Typography>
      </ToggleButton>
      <ToggleButton
        sx={toggleStyle}
        value="Vegan & Gluten Free"
        onClick={() => handleCategory("Vegan & Gluten Free")}
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
          Vegan & Gluten Free
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

function ShopProducts() {
  const { data, isLoading } = useQuery("products", getProducts);
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");
  if (isLoading) return <Typography variant="h2">Is Loading...</Typography>;
  // const handleToggleChange = (category) => {
  //   setSelectedCategory(category);
  // };
  const handleCategory = (category) => setSelectedCategory(category);
  const filterProductsByCategory = (category, products) => {
    switch (category) {
      case "Vegan & Gluten Free":
        return products.filter(
          (product) => product.vegan && product.glutenFree
        );
      case "Vegan":
        return products.filter((product) => product.vegan);
      case "Gluten Free":
        return products.filter((product) => product.glutenFree);
      default:
        return products;
    }
  };

  const filteredProducts = filterProductsByCategory(selectedCategory, data);
  return (
    <>
      <Box sx={{ p: 5, bgcolor: "#F2F2F2" }}>
        <Grid container spacing={3}>
          <Grid item md={8}>
            <Box sx={{ mb: 4 }}>
              <Box>
                <ColorToggleButton handleCategory={handleCategory} />
              </Box>
            </Box>
            <Grid container spacing={2}>
              {filteredProducts?.map((product) => (
                <Grid item md={4} key={product._id}>
                  <ShopProductCard product={product} />
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
