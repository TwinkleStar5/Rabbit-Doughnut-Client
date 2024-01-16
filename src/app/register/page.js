"use client";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
} from "@mui/material";

import { useState } from "react";
import { register } from "@/utils/users";
import { toast } from "react-toastify";

function Register() {
  const [user, setUser] = useState({}); //intial user state is an empty object

  const onChangeHandler = (e) => {
    //setUser is the function to update the user state, and initially, user is an empty object. spread operator (...) to create a shallow copy of the current user object.
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const data = await register(user);
      if (data.status) {
        toast.error(data.msg, {
          position: "bottom-center",
          autoClose: 2000,
          closeOnClick: true,
          theme: "colored",
          pauseOnHover: false,
        });
      } else {
        toast.success("Account Created Successfully", {
          position: "bottom-center",
          autoClose: 2000,
          closeOnClick: true,
          theme: "colored",
          pauseOnHover: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div style={{ backgroundColor: "#92CDF9", height: "105dvh" }}>
      <Container
        sx={{
          p: "30px",
        }}
        maxWidth="sm"
      >
        <Box sx={{ backgroundColor: "white", borderRadius: "25px", p: 3 }}>
          <Typography variant="h3" textAlign="center">
            CREATE ACCOUNT
          </Typography>
          <Box
            sx={{ m: 2 }}
            component="form"
            method="POST"
            onSubmit={onSubmitHandler}
          >
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  name="fullname"
                  label="Full Name"
                  sx={{ borderRadius: "25px" }}
                  onChange={onChangeHandler}
                ></TextField>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  name="username"
                  label="Username"
                  onChange={onChangeHandler}
                ></TextField>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  onChange={onChangeHandler}
                ></TextField>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  name="password"
                  label="Confirm password"
                  type="password"
                  onChange={onChangeHandler}
                ></TextField>
              </Grid>
            </Grid>
            <Button
              variant="button"
              type="submit"
              sx={{ display: "block", margin: "20px auto" }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Register;
