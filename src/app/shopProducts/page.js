"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, Grid, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getProducts } from "@/utils/products";
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

function ShopProducts() {
  const { data, isLoading } = useQuery("products", getProducts);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isLoading) return <Typography variant="h2">Is Loading...</Typography>;

  return (
    <>
      {data.map((product) => (
        <Card key={product.id} sx={{ maxWidth: 260 }}>
          <CardActionArea onClick={handleOpen}>
            <CardMedia component="img" height="140" image={product.image} />
          </CardActionArea>
          <CardContent>
            <Box textAlign="center">
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Link href="#" onClick={handleOpen}>
                  Allergens
                </Link>
              </Typography>
              <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                  <Grid item></Grid>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </Typography>
                </Box>
              </Modal>
              <Button variant="contained" sx={{ mt: 3 }}>
                ADD
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default ShopProducts;
