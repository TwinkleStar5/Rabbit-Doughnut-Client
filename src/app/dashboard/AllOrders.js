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
import { getOrder } from "@/utils/orders";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell component="th" scope="row">
          {row.email}
        </TableCell>
        <TableCell align="right">{row.grandTotal}</TableCell>
        <TableCell align="right">{row.purchased_date}</TableCell>
        <TableCell align="right">
          {row.delivery ? "Delivery" : "Pick Up"}
        </TableCell>
        <TableCell align="right">Pending</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Order ID: {row._id}
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                Customer Name: {`${row.firstName} ${row.lastName}`}
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                Phone Number: {row.phoneNumber}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.cart?.map((pack, idx) => (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <ul>
                          {pack[idx]?.items?.map((donut) => (
                            <li>
                              {donut.product} x {donut.quantity}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>{pack[idx]?.quantity}</TableCell>
                      <TableCell align="right">
                        {pack?.items.map((donut) =>
                          donut?.quantity === 2
                            ? "RM9.90"
                            : donut?.quantity === 6
                            ? "RM29.90"
                            : "RM49.90"
                        )}
                      </TableCell>
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

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("#839248", "134.50", "12/2/2024", "Pending"),
  createData("#100244", "84.40", "8/12/2023", "Delivered"),
  createData("#482023", "23.30", "6/9/2023", "Delivered"),
];

const fonts = { fontSize: "20px", fontFamily: "Work Sans" };
function AllOrdersTable() {
  const { data, isLoading } = useQuery("orders", getOrder);
  if (isLoading ? <h3>Loading</h3> : null) console.log(data);
  console.log("Type of data:", typeof data);
  console.log("Data:", data);
  if (!Array.isArray(data)) return <p>No orders found</p>;

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
                <TableCell align="right" sx={fonts}>
                  Total Amount
                </TableCell>
                <TableCell align="right" sx={fonts}>
                  Ordered Date
                </TableCell>
                <TableCell align="right" sx={fonts}>
                  Mode
                </TableCell>

                <TableCell align="right" sx={fonts}>
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

export default AllOrdersTable;
