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
import "../../globals.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getProducts,
  editOneProduct,
  deleteOneProduct,
} from "@/utils/products";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
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

function EditDeleteProduct() {
  const { data } = useQuery("products", getProducts);
  const [editProduct, setEditProduct] = useState({});
  const router = useRouter();
  function getIdFromUrl(url) {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("id");
  }
  const idFromUrl = getIdFromUrl(window.location.href);

  useEffect(() => {
    const product = data && data.find((product) => product._id === idFromUrl);
    setEditProduct(product || {});
  }, [data, idFromUrl]);

  const [currentImage, setCurrentImage] = useState(editProduct?.image);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(editOneProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      alert(`Oops, unable to edit ${editProduct.name}`, e.response.data.msg);
    },
  });

  const { mutate: deleteOneMutation } = useMutation(deleteOneProduct, {
    onSuccess: async () => {
      queryClient.invalidateQueries(["products"]);
      router.push("/dashboard");
    },
    onError: (error) => {
      alert(`Oops, unable to delete ${editProduct.name}`, e.response.data.msg);
    },
  });

  const inputRef = useRef(null);

  console.log(editProduct);
  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (fileObj) {
      const reader = new FileReader();
      console.log(reader);
      reader.onloadend = () => {
        setCurrentImage(reader.result);
      };
      setEditProduct({ ...editProduct, image: fileObj });
      reader.readAsDataURL(fileObj);
    }

    // Reset the input value to allow selecting the same file again
    event.target.value = null;
  };
  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: `Are you sure you want to delete ${editProduct.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your doughnut has been deleted.",
          icon: "success",
        });
      }
    });
    deleteOneMutation(id);
  };

  const handleEditProduct = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value.trim() });
    console.log(editProduct);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    mutate(editProduct);
    Swal.fire({
      icon: "success",
      title: `${editProduct.name} has been updated!`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <form onSubmit={handleEditSubmit} encType="multipart/form-data">
        <Grid
          container
          sx={{
            px: 5,
            pt: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" sx={{ color: "#041E42" }}>
            EDIT...
          </Typography>
          <Grid item sm={6} sx={{ width: "100%", mt: 3 }}>
            <TextField
              fullWidth
              label="Doughnut Name"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="name"
              color="info"
              role="name"
              value={editProduct?.name}
              required
              onChange={handleEditProduct}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ p: 5, justifyContent: "center" }} spacing={3}>
          <Grid item md={4} sx={{ margin: "auto", mb: 4 }}>
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
                  src={
                    !currentImage
                      ? `http://localhost:8000/${editProduct.image}`
                      : currentImage
                  }
                  // src={editProduct?.image}
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
                  required
                  label="Description"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                  color="info"
                  role="description"
                  multiline
                  value={editProduct?.description}
                  onChange={handleEditProduct}
                />
              </Grid>
              <Grid
                container
                spacing={3}
                sx={{ width: "100%", textAlign: "center" }}
              >
                <Grid item sm={4} sx={{ mb: 3, width: "100%" }}>
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
                    label="Quantity"
                    type="number"
                    name="quantity"
                    value={editProduct?.quantity}
                    onChange={handleEditProduct}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{ min: 1 }}
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item sm={8} sx={{ width: "100%", mb: 3 }}>
                  <TextField
                    name="allergens"
                    required
                    label="Allergens"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    autoComplete="allergens"
                    variant="outlined"
                    color="info"
                    multiline
                    value={editProduct?.allergens}
                    onChange={handleEditProduct}
                  />
                </Grid>
              </Grid>
              <Grid item sx={{ width: "100%", mb: 3 }}>
                <Grid container sx={{ width: "100%", textAlign: "center" }}>
                  <Grid item sm={4} sx={{ width: "100%", margin: "auto" }}>
                    <FormControlLabel
                      className="FormControlLabel"
                      control={
                        <Checkbox
                          color="info"
                          name="vegan"
                          disableFocusRipple
                          checked={editProduct.vegan ? true : false}
                          onChange={() =>
                            setEditProduct({
                              ...editProduct,
                              vegan: !editProduct.vegan,
                            })
                          }
                        />
                      }
                      label="Vegan"
                    />
                  </Grid>
                  <Grid item sm={4} sx={{ width: "100%", margin: "auto" }}>
                    <FormControlLabel
                      className="FormControlLabel"
                      control={
                        <Checkbox
                          color="info"
                          name="glutenFree"
                          disableFocusRipple
                          checked={editProduct.glutenFree ? true : false}
                          onChange={() =>
                            setEditProduct({
                              ...editProduct,
                              glutenFree: !editProduct.glutenFree,
                            })
                          }
                        />
                      }
                      label="Gluten Free"
                    />
                  </Grid>
                  <Grid item sm={4} sx={{ width: "100%", margin: "auto" }}>
                    <FormControlLabel
                      className="FormControlLabel"
                      control={
                        <Checkbox
                          color="info"
                          name="isActive"
                          disableFocusRipple
                          checked={editProduct.isActive ? true : false}
                          onChange={() =>
                            setEditProduct({
                              ...editProduct,
                              isActive: !editProduct.isActive,
                            })
                          }
                        />
                      }
                      label="isActive"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mt: 3, textAlign: "center", width: "100%" }}>
                <Grid container sx={{ width: "100%" }}>
                  <Grid item sm={6} sx={{ width: "100%", mb: 4 }}>
                    <Button
                      type="submit"
                      variant="button"
                      sx={{
                        bgcolor: "#ADDFB3 !important",
                        color: "#041E42 !important",
                        borderRadius: "8px",
                        width: "250px",
                        height: "55px",
                        py: 4,
                      }}
                    >
                      <EditIcon sx={{ mr: 2 }} /> Confirm Edit
                    </Button>
                  </Grid>
                  <Grid item sm={6} sx={{ width: "100%", mb: 4 }}>
                    <Button
                      variant="button"
                      sx={{
                        bgcolor: "#D1182E !important",
                        borderRadius: "8px",
                        width: "280px",
                        height: "55px",
                        py: 4,
                      }}
                      onClick={() => handleDeleteProduct(editProduct._id)}
                    >
                      <DeleteIcon sx={{ mr: 2 }} /> Delete Doughnut
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>

    // <>
    //   <form
    //     onSubmit={() => handleEditSubmit(product._id)}
    //     encType="multipart/form-data"
    //   >
    //     <Grid container sx={{ px: 5, pt: 5, justifyContent: "center" }}>
    //       <Grid item xs={6}>
    //         <TextField
    //           fullWidth
    //           label="Doughnut Name"
    //           InputLabelProps={{
    //             shrink: true,
    //           }}
    //           variant="outlined"
    //           name="name"
    //           color="info"
    //           role="name"
    //           value={editProduct?.name}
    //           required
    //           onChange={handleEditProduct}
    //         />
    //       </Grid>
    //     </Grid>
    //     <Grid container sx={{ p: 5, justifyContent: "center" }}>
    //       <Grid item md={4} sx={{ margin: "auto" }}>
    //         <label onClick={handleClick}>
    //           <Box
    //             sx={{
    //               position: "relative",
    //               "&:hover .changeImageText": {
    //                 visibility: "visible",
    //                 opacity: 0.6,
    //                 cursor: "pointer",
    //               },
    //             }}
    //           >
    //             <img
    //               src={currentImage}
    //               style={{
    //                 width: "300px",
    //                 borderRadius: "20px",
    //                 margin: "auto",
    //               }}
    //             />
    //             <Box
    //               className="changeImageText"
    //               sx={{
    //                 position: "absolute",
    //                 bgcolor: "white",
    //                 opacity: 0,
    //                 zIndex: 100,
    //                 top: 0,
    //                 bottom: 0,
    //                 left: 0,
    //                 right: 0,
    //                 height: "100%",
    //                 width: "100%",
    //                 margin: "auto",
    //                 transition: "0.5s ease",
    //               }}
    //             >
    //               <Typography
    //                 variant="h6"
    //                 sx={{
    //                   color: "black",
    //                   fontSize: "25px",
    //                   fontWeight: "bold",
    //                   position: "absolute",
    //                   top: "50%",
    //                   left: "50%",
    //                   transform: "translate(-50%, -50%)",
    //                   textAlign: "center",
    //                 }}
    //               >
    //                 <EditIcon sx={{ fontSize: "25px" }} /> <br /> Change Image
    //               </Typography>
    //             </Box>
    //           </Box>
    //         </label>
    //         <input
    //           ref={inputRef}
    //           style={{ display: "none" }}
    //           type="file"
    //           onChange={handleFileChange}
    //         />
    //       </Grid>
    //       <Grid
    //         item
    //         md={8}
    //         sx={{ fontFamily: "Work Sans", fontSize: "30px !important" }}
    //       >
    //         <Grid container>
    //           <Grid item xs={12} sx={{ mb: 3 }}>
    //             <TextField
    //               name="description"
    //               required
    //               label="Description"
    //               InputLabelProps={{
    //                 shrink: true,
    //               }}
    //               fullWidth
    //               variant="outlined"
    //               color="info"
    //               role="description"
    //               multiline
    //               value={editProduct?.description}
    //               onChange={handleEditProduct}
    //             />
    //           </Grid>
    //           <Grid container spacing={3}>
    //             <Grid item xs={4} sx={{ mb: 3 }}>
    //               <TextField
    //                 id="outlined-number"
    //                 required
    //                 variant="outlined"
    //                 color="info"
    //                 label="Quantity"
    //                 type="number"
    //                 name="quantity"
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //                 inputProps={{ min: 1 }}
    //                 sx={{ width: "100%" }}
    //               />
    //               {/* <CustomNumberInput
    //                 label="Quantity"
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //                 name="quantity"
    //                 // value={editProduct?.quantity}
    //                 value={String(editProduct?.quantity)}
    //                 sx={{
    //                   "& input::placeholder": { color: "#676767" },
    //                 }}
    //                 onChange={(e) =>
    //                   setEditProduct({
    //                     ...editProduct,
    //                     [e.target.name]: Number(e.target.value),
    //                   })
    //                 }
    //               /> */}
    //             </Grid>
    //             <Grid item xs={8} sx={{ mb: 3 }}>
    //               <TextField
    //                 name="allergens"
    //                 required
    //                 label="Allergens"
    //                 InputLabelProps={{
    //                   shrink: true,
    //                 }}
    //                 fullWidth
    //                 autoComplete="allergens"
    //                 variant="outlined"
    //                 color="info"
    //                 multiline
    //                 value={editProduct?.allergens}
    //                 onChange={handleEditProduct}
    //               />
    //             </Grid>
    //           </Grid>
    //           <Grid
    //             item
    //             xs={4}
    //             sx={{ fontFamily: "Work Sans", fontSize: "30px", pl: 5 }}
    //           >
    //             <FormControlLabel
    //               control={
    //                 <Checkbox
    //                   color="info"
    //                   name="vegan"
    //                   disableFocusRipple
    //                   checked={editProduct?.vegan}
    //                   onChange={handleEditProduct}
    //                 />
    //               }
    //               label="Vegan"
    //             />
    //           </Grid>
    //           <Grid item xs={4}>
    //             <FormControlLabel
    //               control={
    //                 <Checkbox
    //                   color="info"
    //                   name="glutenFree"
    //                   checked={editProduct?.glutenFree}
    //                   disableFocusRipple
    //                   onChange={handleEditProduct}
    //                 />
    //               }
    //               label="Gluten Free"
    //             />
    //           </Grid>
    //           <Grid item xs={4}>
    //             <FormControlLabel
    //               control={
    //                 <Checkbox
    //                   color="info"
    //                   name="isActive"
    //                   checked={editProduct?.isActive || false}
    //                   disableFocusRipple
    //                   onChange={(e) =>
    //                     setEditProduct({
    //                       ...editProduct,
    //                       isActive: e.target.checked,
    //                     })
    //                   }
    //                 />
    //               }
    //               label="isActive"
    //             />
    //           </Grid>
    //           <Grid
    //             item
    //             sx={{
    //               mt: 3,
    //               width: "100%",
    //               justifyContent: "space-around",
    //               display: "flex",
    //             }}
    //           >
    //             <Box>
    //               <Button
    //                 type="submit"
    //                 variant="button"
    //                 sx={{
    //                   bgcolor: "#ADDFB3 !important",
    //                   color: "#041E42 !important",
    //                   borderRadius: "8px",
    //                   width: "250px",
    //                   height: "55px",
    //                 }}
    //               >
    //                 <EditIcon sx={{ mr: 2 }} /> Confirm Edit
    //               </Button>
    //             </Box>
    //             <Box>
    //               <Button
    //                 variant="button"
    //                 sx={{
    //                   bgcolor: "#D1182E !important",
    //                   borderRadius: "8px",
    //                   width: "280px",
    //                   height: "55px",
    //                 }}
    //                 onClick={() => handleDeleteProduct(editProduct._id)}
    //               >
    //                 <DeleteIcon sx={{ mr: 2 }} /> Delete Doughnut
    //               </Button>
    //             </Box>
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </form>
    // </>
  );
}

export default EditDeleteProduct;
