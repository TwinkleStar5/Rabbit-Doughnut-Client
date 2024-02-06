"use client";
import * as React from "react";
import { useRef, useState } from "react";
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
import donut from "../../../img/build_placeholder.webp";
import "../../globals.css";
import EditIcon from "@mui/icons-material/Edit";
import CelebrationIcon from "@mui/icons-material/Celebration";
import "../../globals.css";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { addProducts, editProduct } from "@/utils/products";
import { toast } from "react-toastify";

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
    color: #FF90C2;
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
      name="quantity"
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
        type: "button",
        name: "quantity",
      }}
      slotProps={{
        name: "quantity",
        incrementButton: {
          children: "▴",
          type: "button",
        },
        decrementButton: {
          children: "▾",
          type: "button",
        },
      }}
      {...props}
      ref={ref}
      min={1}
    />
  );
});

function CreateProduct() {
  const queryClient = useQueryClient();
  const { mutate: mutateAdd } = useMutation(addProducts, {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success(data.msg, {
        position: "bottom-right",
        autoClose: 2500,
        pauseOnHover: false,
        theme: "light",
      });
    },
    onError: (error) => {
      alert(`Oops, unable to edit ${editProduct.name}`);
    },
  });
  const { mutate: mutateEdit } = useMutation(editProduct, {
    onSuccess: () => queryClient.invalidateQueries(["products"]),
    onError: (e) => alert(e.response.data.msg),
  });
  const [product, setProduct] = useState({});
  console.log(product);
  const [currentImage, setCurrentImage] = useState(donut.src);

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleDeleteProduct = () => {};

  const handleChangeProduct = (e) => {
    // let quantity = e.target.getAttribute("placeholder");

    setProduct({
      ...product,
      [e.target.name]: e.target.value,
      // [quantity === "Quantity" ? "quantity" : null]: e.target.value,
    });
    console.log(currentImage);
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    mutateAdd(product);
    alert("Successfully added");
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    console.log(fileObj);
    if (fileObj) {
      const reader = new FileReader();
      console.log(reader);
      reader.onloadend = () => {
        setCurrentImage(reader.result);
      };
      setProduct({ ...product, image: fileObj });
      reader.readAsDataURL(fileObj);
    }

    // Reset the input value to allow selecting the same file again
    event.target.value = null;
  };

  return (
    <>
      <form onSubmit={handleSubmitProduct} encType="multipart/form-data">
        <Grid container sx={{ px: 5, pt: 5, justifyContent: "center" }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              name="name"
              color="info"
              role="name"
              label="Invent a doughnut name!"
              required
              onChange={handleChangeProduct}
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
                    <EditIcon sx={{ fontSize: "25px" }} /> <br /> Add Doughnut
                    Image
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
                  label="Add Doughnut Description"
                  fullWidth
                  variant="outlined"
                  color="info"
                  role="description"
                  multiline
                  required
                  onChange={handleChangeProduct}
                />
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6} sx={{ mb: 3 }}>
                  {/* <CustomNumberInput
                    placeholder="Quantity"
                    sx={{
                      "& input::placeholder": { color: "#676767" },
                    }}
                    name="quantity"
                    onChange={handleChangeProduct}
                  /> */}
                  <TextField
                    required
                    variant="outlined"
                    color="info"
                    placeholder="Quantity"
                    type="number"
                    name="quantity"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{ min: 1 }}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6} sx={{ mb: 3 }}>
                  <TextField
                    name="allergens"
                    label="Add Allergens"
                    fullWidth
                    autoComplete="allergens"
                    variant="outlined"
                    color="info"
                    multiline
                    onChange={handleChangeProduct}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{ fontFamily: "Work Sans", fontSize: "30px", pl: 5 }}
              >
                <FormControlLabel
                  className="FormControlLabel"
                  control={
                    <Checkbox
                      color="info"
                      name="vegan"
                      disableFocusRipple
                      checked={product?.vegan || false}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          vegan: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Vegan"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  className="FormControlLabel"
                  control={
                    <Checkbox
                      color="info"
                      name="glutenFree"
                      disableFocusRipple
                      checked={product?.glutenFree || false}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          glutenFree: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Gluten Free"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  className="FormControlLabel"
                  control={
                    <Checkbox
                      color="info"
                      name="isActive"
                      disableFocusRipple
                      checked={product?.isActive || false}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          isActive: e.target.checked,
                        })
                      }
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
                    variant="button"
                    sx={{
                      bgcolor: "#FAE89E !important",
                      color: "#041E42 !important",
                      borderRadius: "8px",
                      width: "250px",
                      height: "55px",
                    }}
                  >
                    <EditIcon sx={{ mr: 2 }} /> Edit
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="button"
                    type="submit"
                    sx={{
                      bgcolor: "#ffc8dd !important",
                      color: "#041E42 !important",
                      borderRadius: "8px",
                      width: "300px",
                      height: "55px",
                    }}
                    onClick={() => handleDeleteProduct}
                  >
                    <CelebrationIcon sx={{ mr: 2 }} /> Publish Doughnut
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

export default CreateProduct;
