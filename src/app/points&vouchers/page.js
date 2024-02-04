import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Typography } from "@mui/material";

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData("Voucher 1", "3/3/2024"),
  createData("Voucher 2", "14/7/2024"),
  createData("Voucher 3", "29/11/2024"),
];

function PointsVouchers() {
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 8,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Your Points & Vouchers
        </Typography>
        <Grid item sx={{ textAlign: "center" }} xs={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: "20px",
              bgcolor: "#FBECB2",
            }}
            elevation={4}
          >
            <Grid item sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography variant="h5"> Total Points: 178</Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sx={{ mt: 4 }} xs={6}>
          <TableContainer
            component={Paper}
            sx={{
              bgcolor: "#BDE0FE",
              borderRadius: "20px",
              fontFamily: "Work Sans",
            }}
            elevation={4}
          >
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Total Vouchers</TableCell>
                  <TableCell align="center">Expiry Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.calories}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default PointsVouchers;

//show total points accumulated by customer
//show all their current vouchers available
