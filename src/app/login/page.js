// "use client";
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   Grid,
// } from "@mui/material";

// import { useState } from "react";
// import { login } from "@/utils/users";
// import { toast } from "react-toastify";
// // import { useRouter } from "next/navigation";
// import { redirect } from "react-router-dom";

// function Login() {
//   //   const { push } = useRouter();

//   const [user, setUser] = useState({}); //intial user state is an empty object

//   const onChangeHandler = (e) => {
//     //setUser is the function to update the user state, and initially, user is an empty object. spread operator (...) to create a shallow copy of the current user object.
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const onSubmitHandler = async (e) => {
//     try {
//       e.preventDefault();
//       const data = await login(user);
//       if (data.status) {
//         toast.error(data.msg, {
//           position: "bottom-center",
//           autoClose: 2000,
//           closeOnClick: true,
//           theme: "colored",
//           pauseOnHover: false,
//         });
//       } else {
//         toast.success("Signed In Successfully", {
//           position: "bottom-center",
//           autoClose: 2000,
//           closeOnClick: true,
//           theme: "colored",
//           pauseOnHover: false,
//         });
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         //push("/"); //after login, you'll be directed to homepage
//         redirect("/");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   return (
//     <div style={{ backgroundColor: "#D5C4E7", height: "75dvh" }}>
//       <Container
//         sx={{
//           p: "30px",
//         }}
//         maxWidth="sm"
//       >
//         <Box sx={{ backgroundColor: "white", borderRadius: "25px", p: 3 }}>
//           <Typography variant="h3" textAlign="center">
//             LOGIN
//           </Typography>
//           <Box
//             sx={{ m: 2 }}
//             component="form"
//             method="POST"
//             onSubmit={onSubmitHandler}
//           >
//             <Grid container spacing={3} justifyContent="center">
//               <Grid item xs={8}>
//                 <TextField
//                   fullWidth
//                   name="username"
//                   label="Username"
//                   onChange={onChangeHandler}
//                 ></TextField>
//               </Grid>
//               <Grid item xs={8}>
//                 <TextField
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   onChange={onChangeHandler}
//                 ></TextField>
//               </Grid>
//             </Grid>
//             <Button
//               variant="button"
//               type="submit"
//               sx={{ display: "block", margin: "20px auto" }}
//             >
//               Login
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </div>
//   );
// }

// export default Login;
