"use client";
import * as React from "react";
import { useRef } from "react";
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

function EditDeleteProduct
() {
  const [currentImage, setCurrentImage] = React.useState(donut.src);

  const inputRef = useRef(null);

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

  const handleDeleteProduct = () => {};
  return (
    <>
      <Box sx={{ textAlign: "center", my: 5 }}>
        <Typography variant="h3" sx={{ color: "info.main" }}>
          Millie Bobby Brownie
        </Typography>
      </Box>
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
                style={{ width: "300px", borderRadius: "20px", margin: "auto" }}
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
                label="Doughnut Description"
                fullWidth
                variant="outlined"
                color="info"
                role="description"
                multiline
              />
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6} sx={{ mb: 3 }}>
                <CustomNumberInput
                  placeholder="Quantity"
                  sx={{
                    "& input::placeholder": { color: "#676767" },
                  }}
                />
              </Grid>
              <Grid item xs={6} sx={{ mb: 3 }}>
                <TextField
                  name="allergens"
                  label="Allergens"
                  fullWidth
                  autoComplete="allergens"
                  variant="outlined"
                  color="info"
                  multiline
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ fontFamily: "Work Sans", fontSize: "30px", pl: 5 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    color="info"
                    name="vegan"
                    value="yes"
                    disableFocusRipple
                  />
                }
                label="Vegan"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="info"
                    name="glutenFree"
                    value="yes"
                    disableFocusRipple
                  />
                }
                label="Gluten Free"
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
                  onClick={() => handleDeleteProduct}
                >
                  <DeleteIcon sx={{ mr: 2 }} /> Delete Doughnut
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default EditDeleteProduct
;
