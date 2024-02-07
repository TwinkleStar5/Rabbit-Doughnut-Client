import * as React from "react";
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
import { useQuery } from "react-query";
import { getSingleOrder } from "@/utils/orders";
import { Checkbox, Grid } from "@mui/material";
import moment from "moment";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [completed, setCompleted] = React.useState(row.status);
  console.log(row);
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
          {row?.email}
        </TableCell>
        <TableCell align="center">RM{row.grandTotal.toFixed(2)}</TableCell>
        <TableCell align="center">
          {moment(row.purchased_date).format("DD/MM/YYYY, h:mmA")}
        </TableCell>
        <TableCell align="center">
          {row.delivery ? "Delivery" : "Pick Up"}
        </TableCell>
        <TableCell align="center" sx={{ display: "flex" }}>
          <Checkbox
            checked={completed}
            onChange={() => setCompleted(!row.status)}
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
                            console.log(donut?.product?.name);
                            return (
                              <li>
                                {donut?.product?.name} x {donut.quantity}
                              </li>
                            );
                          })}
                        </ul>
                      </TableCell>
                      <TableCell align="center">{pack?.quantity}</TableCell>
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

const fonts = { fontSize: "20px", fontFamily: "Work Sans" };
function ClientOrder() {
  const { data, isLoading } = useQuery("order", getSingleOrder);
  console.log(data);
  if (isLoading ? <h3>Loading</h3> : null) console.log(data);
  // console.log("Type of data:", typeof data);
  // console.log("Data:", data);
  if (!Array.isArray(data)) return <p>No orders found</p>;

  return (
    <>
      {isLoading ? (
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          IS LOADING...
        </Typography>
      ) : data?.length ? (
        <TableContainer
          component={Paper}
          sx={{ bgcolor: "#f1e3fc", borderRadius: "20px" }}
          elevation={3}
        >
          <Table>
            <TableHead>
              <TableRow sx={fonts}>
                <TableCell />
                <TableCell sx={fonts}>Ordered Date</TableCell>
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
                <Row key={row.name} row={row} />
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

export default ClientOrder;
