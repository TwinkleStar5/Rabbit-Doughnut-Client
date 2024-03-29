import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getOrder, editSingleOrder } from "@/utils/orders";
import { Checkbox, Grid } from "@mui/material";
import moment from "moment";

// function createData(name, calories, fat, carbs, protein, price) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       {
//         date: "2020-01-05",
//         customerId: "11091700",
//         amount: 3,
//       },
//       {
//         date: "2020-01-02",
//         customerId: "Anonymous",
//         amount: 1,
//       },
//     ],
//   };
// }

function Row(props) {
  const { row, mutate, editOrder, setEditOrder } = props;
  const [open, setOpen] = React.useState(false);
  const [completed, setCompleted] = React.useState(row.status);

  const handleEditOrder = (id) => {
    // console.log(id);
    const updatedOrder = { ...row, status: !completed }; // Toggle the status
    mutate({ id, ...updatedOrder }); // Mutate the specific order using react-query's useMutation
    setCompleted(!completed); // Update the local state to reflect the new status
  };

  // const handleEditOrder = () => {
  //   const updatedOrder = { ...row, status: !row.status }; // Create a new object with updated status
  //   mutate(updatedOrder, {
  //     onSuccess: () => {
  //       // Update the UI after mutation succeeds
  //       props.setEditOrder(updatedOrder);
  //     },
  //     onError: (error) => {
  //       // Handle error if mutation fails
  //       console.error("Mutation failed:", error);
  //     },
  //   });
  // };

  return (
    <React.Fragment
      sx={{
        bgcolor: "#A7D3D4",
        borderRadius: "20px",
        fontFamily: "Work Sans",
      }}
    >
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" scope="row">
          {row.email}
        </TableCell>
        <TableCell align="center">RM{row.grandTotal.toFixed(2)}</TableCell>
        <TableCell align="center">
          {/* {row?.purchased_date} */}
          {moment(row.purchased_date).format("DD/MM/YYYY, h:mmA")}
        </TableCell>
        <TableCell align="center">
          {row.delivery ? "Delivery" : "Pick Up"}
        </TableCell>
        <TableCell align="center" sx={{ display: "flex" }}>
          <Checkbox
            checked={completed}
            // onChange={()=> }
            onChange={() => handleEditOrder(row._id)}
            // onChange={() =>
            //   props.setEditOrder({ ...props.editOrder, status: !row.status })
            // }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Grid container sx={{ display: "flex" }} spacing={3}>
                <Grid item>
                  <Typography variant="h6" component="div">
                    Order ID: <strong>{row._id}</strong>
                  </Typography>
                  <Typography variant="h6" component="div">
                    Customer Name:{" "}
                    <strong>{`${row.firstName} ${row.lastName}`}</strong>
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div">
                    Phone Number: <strong>0{row.phoneNumber}</strong>
                  </Typography>
                </Grid>
                {row.delivery ? (
                  <Grid item>
                    <Typography variant="h6" component="div">
                      State: <strong>{row.state}</strong>
                    </Typography>
                    <Typography variant="h6" component="div">
                      Address:
                      <strong>
                        {` ${row.address}, ${row.city}, ${row.postalCode}, Malaysia`}
                      </strong>
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div">
                      Company:{" "}
                      <strong>{row.company ? row.company : "None"}</strong>
                    </Typography>
                  </Grid>
                ) : (
                  <Grid item>
                    <Typography variant="h6" component="div">
                      Pick Up Date: <strong>{row.collectDate}</strong>
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div">
                      Pick Up Time: <strong>{row.time}</strong>
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Product</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    {/* <TableCell align="center">Subtotal</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.cart?.map((pack, idx) => (
                    <TableRow>
                      <TableCell align="left" scope="row">
                        <ul>
                          {pack?.items?.map((donut) => {
                            // console.log(donut?.product?.name);
                            return (
                              <li>
                                {donut?.product?.name} x {donut.quantity}
                              </li>
                            );
                          })}
                        </ul>
                      </TableCell>
                      <TableCell align="center">{pack?.quantity}</TableCell>
                      {/* <TableCell align="center">
                        {pack?.items?.forEach((donut) => {
                          let totalQuantities = 0;
                          return (totalQuantities += donut.quantity);
                        })}
                        {pack?.items.map((donut,idx) => {
                          // const cal = donut.quantity 
                          const cal = [...(donut[idx]?.quantity + "")].reduce(
                            (s, e) => s + +e[0],
                            0
                          );
                         
                          console.log(cal);
                        })}
                        {pack.items
                          .map((donut) => Array(donut.quantity).length)
                          .reduce((acc, val) => acc + val, 0) *
                          pack.quantity ===
                        2
                          ? "RM 9.90"
                          : pack.items
                              .map((donut) => Array(donut.quantity).length)
                              .reduce((acc, val) => acc + val, 0) *
                              pack.quantity ===
                            6
                          ? "RM 26.90"
                          : pack.items
                              .map((donut) => Array(donut.quantity).length)
                              .reduce((acc, val) => acc + val, 0) *
                              pack.quantity ===
                            6
                          ? "RM 49.90"
                          : null}
                      </TableCell> */}

                      {/* <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData("#839248", "134.50", "12/2/2024", "Pending"),
//   createData("#100244", "84.40", "8/12/2023", "Delivered"),
//   createData("#482023", "23.30", "6/9/2023", "Delivered"),
// ];

const fonts = { fontSize: "20px", fontFamily: "Work Sans" };
function AllOrdersTable() {
  const { data, isLoading } = useQuery("orders", getOrder);
  const [editOrder, setEditOrder] = useState(null);

  useEffect(() => {
    // Update editOrder state only when data is available, unless you have onChange
    if (data) {
      setEditOrder(data);
    }
  }, [data]);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(editSingleOrder, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (e) => {
      alert(e.response.data.msg);
    },
  });

  // console.log("Type of data:", typeof data);
  // console.log("Data:", data);
  if (!Array.isArray(data)) return <p>No orders found</p>;
  // console.log(data);
  return (
    <>
      {isLoading ? (
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          IS LOADING...
        </Typography>
      ) : data.length ? (
        <TableContainer
          component={Paper}
          sx={{ bgcolor: "#f1e3fc", borderRadius: "20px" }}
          elevation={3}
        >
          <Table>
            <TableHead>
              <TableRow sx={fonts}>
                <TableCell />
                <TableCell sx={fonts}>Email</TableCell>
                <TableCell align="center" sx={fonts}>
                  Total Amount
                </TableCell>
                <TableCell align="center" sx={fonts}>
                  Ordered Date
                </TableCell>
                <TableCell align="center" sx={fonts}>
                  Mode
                </TableCell>
                <TableCell align="center" sx={fonts}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={fonts}>
              {data?.map((row) => (
                <Row
                  key={row.name}
                  row={row}
                  editOrder={editOrder}
                  setEditOrder={setEditOrder}
                  mutate={mutate}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          NO ORDERS TO SHOW
        </Typography>
      )}
    </>
  );
}

export default AllOrdersTable;
