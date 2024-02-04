"use client";
import * as React from "react";
import { useRef, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import donut from "../../../img/millie.webp";
import "../../globals.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getProducts, editProduct, deleteOneProduct } from "@/utils/products";
import { useParams } from "react-router-dom";
import { withRouter } from "react-router-dom";

const StyledInputRoot = styled("div")(
  `
  font-family: 'Work Sans';
  font-weight: 400;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 20px;
  grid-template-rows: 1fr 38px;
  overflow: hidden;
  column-gap: 4px;
  padding: 4px;
 


  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const StyledInputElement = styled("input")(
  `
  font-size: 22px;
  font-family: 'Work Sans';
  font-weight: 400;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  background: white;
  border: 1px solid;
  border-color: #C4C4C4;
  border-radius: 4px;
  padding: 8px 12px;
  outline: 0;
`
);

const StyledButton = styled("button")(
  `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 22px;
  height: 22px;
  font-family: 'Work Sans';
  font-size: 22px;
  line-height: 2;
  box-sizing: border-box;
  border: 0;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;


  &.${numberInputClasses.incrementButton} {
    grid-column: 2/3;
    grid-row: 1/2;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid;
    font-size:25px;
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 2/3;
    grid-row: 2/3;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid;
    font-size: 25px;
    margin-top: 15px;
  }

  &:hover {
    cursor: pointer;
    color: #ADDFB3;
  }

  & .arrow {
    transform: translateY(-1px);
  }

  & .arrow {
    transform: translateY(-1px);
  }
`
);

const CustomNumberInput = React.forwardRef(function CustomNumberInput(
  props,
  ref
) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: "▴",
        },
        decrementButton: {
          children: "▾",
        },
      }}
      {...props}
      ref={ref}
      min={1}
    />
  );
});

function EditDeleteProduct() {
  const [editProduct, setEditProduct] = useState({});
  // const { id } = useParams();
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.fetchData(id);
  };
  fetchData = (id) => {
    const { data } = useQuery("products", getProducts);
    if (data) {
      const productById = data.find((item) => item._id === id);
      this.setState({ editProduct: productById });
    }
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation(editProduct, {
    onSuccess: () => queryClient.invalidateQueries("products"),
    onError: (e) => alert(e.response.data.msg),
  });
  const { mutate: deleteOneMutation } = useMutation(deleteOneProduct, {
    onSuccess: () => queryClient.invalidateQueries("products"),
    onError: (e) => alert(e.response.data.msg),
  });

  const [currentImage, setCurrentImage] = useState(donut.src);
  const inputRef = useRef(null);

  useEffect(() => {
    if (data) {
      const productById = data.find((item) => item._id === id);
      setEditProduct(productById);
      console.log(editProduct);
    }
  }, [data, id]);

  useEffect(() => {
    if (editProduct) {
      setCurrentImage(editProduct.image);
    }
  }, [editProduct]);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];

    if (fileObj) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setCurrentImage(reader.result);
      };

      reader.readAsDataURL(fileObj);
    }

    // Reset the input value to allow selecting the same file again
    event.target.value = null;
  };

  const handleDeleteProduct = (id) => {
    e.preventDefault();
    deleteOneMutation(id);
  };

  const handleEditProduct = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
    console.log(editProduct);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    mutate(products);
  };

  return (
    <>
      <form onSubmit={handleEditSubmit}>
        <Grid container sx={{ px: 5, pt: 5, justifyContent: "center" }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              name="name"
              color="info"
              role="name"
              label={editProduct?.name}
              required
              onChange={handleEditProduct}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ p: 5, justifyContent: "center" }}>
          <Grid item md={4} sx={{ margin: "auto" }}>
            <label onClick={handleClick}>
              <Box
                sx={{
                  position: "relative",
                  "&:hover .changeImageText": {
                    visibility: "visible",
                    opacity: 0.6,
                    cursor: "pointer",
                  },
                }}
              >
                <img
                  src={currentImage}
                  style={{
                    width: "300px",
                    borderRadius: "20px",
                    margin: "auto",
                  }}
                />
                <Box
                  className="changeImageText"
                  sx={{
                    position: "absolute",
                    bgcolor: "white",
                    opacity: 0,
                    zIndex: 100,
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "100%",
                    width: "100%",
                    margin: "auto",
                    transition: "0.5s ease",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "black",
                      fontSize: "25px",
                      fontWeight: "bold",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                    }}
                  >
                    <EditIcon sx={{ fontSize: "25px" }} /> <br /> Change Image
                  </Typography>
                </Box>
              </Box>
            </label>
            <input
              ref={inputRef}
              style={{ display: "none" }}
              type="file"
              onChange={handleFileChange}
            />
          </Grid>
          <Grid
            item
            md={8}
            sx={{ fontFamily: "Work Sans", fontSize: "30px !important" }}
          >
            <Grid container>
              <Grid item xs={12} sx={{ mb: 3 }}>
                <TextField
                  name="description"
                  fullWidth
                  variant="outlined"
                  color="info"
                  role="description"
                  multiline
                  label={editProduct?.description}
                  onChange={handleEditProduct}
                />
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6} sx={{ mb: 3 }}>
                  <CustomNumberInput
                    placeholder="Quantity"
                    sx={{
                      "& input::placeholder": { color: "#676767" },
                    }}
                    onChange={handleEditProduct}
                  />
                </Grid>
                <Grid item xs={6} sx={{ mb: 3 }}>
                  <TextField
                    name="allergens"
                    fullWidth
                    autoComplete="allergens"
                    variant="outlined"
                    color="info"
                    multiline
                    label={editProduct?.allergens}
                    onChange={handleEditProduct}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{ fontFamily: "Work Sans", fontSize: "30px", pl: 5 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      color="info"
                      name="vegan"
                      value={editProduct?.vegans ? "yes" : "no"}
                      disableFocusRipple
                      onChange={handleEditProduct}
                    />
                  }
                  label="Vegan"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="info"
                      name="glutenFree"
                      value={editProduct?.glutenFree ? "yes" : "no"}
                      disableFocusRipple
                      onChange={handleEditProduct}
                    />
                  }
                  label="Gluten Free"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="info"
                      name="isActive"
                      value={editProduct?.isActive ? "yes" : "no"}
                      disableFocusRipple
                      onChange={handleEditProduct}
                    />
                  }
                  label="isActive"
                />
              </Grid>
              <Grid
                item
                sx={{
                  mt: 3,
                  width: "100%",
                  justifyContent: "space-around",
                  display: "flex",
                }}
              >
                <Box>
                  <Button
                    type="submit"
                    variant="button"
                    sx={{
                      bgcolor: "#ADDFB3 !important",
                      color: "#041E42 !important",
                      borderRadius: "8px",
                      width: "250px",
                      height: "55px",
                    }}
                  >
                    <EditIcon sx={{ mr: 2 }} /> Confirm Edit
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="button"
                    sx={{
                      bgcolor: "#D1182E !important",
                      borderRadius: "8px",
                      width: "280px",
                      height: "55px",
                    }}
                    onClick={() => handleDeleteProduct(id)}
                  >
                    <DeleteIcon sx={{ mr: 2 }} /> Delete Doughnut
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default EditDeleteProduct;
