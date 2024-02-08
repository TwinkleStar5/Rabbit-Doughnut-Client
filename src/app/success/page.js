import { Typography } from "@mui/material";
import Head from "next/head";

const Success = () => {
  return (
    <>
      <Head>
        <title>Success Page</title>
      </Head>
      <div className="h-screen flex justify-center items-center">
        <Typography variant="h2">Payment Successful !</Typography>
      </div>
    </>
  );
};

export default Success;
