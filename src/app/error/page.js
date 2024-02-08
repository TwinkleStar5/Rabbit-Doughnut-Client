import { Typography } from "@mui/material";
import Head from "next/head";

const Error = () => {
  return (
    <>
      <Head>
        <title>Error Page</title>
      </Head>
      <div className="h-screen flex justify-center items-center">
        <Typography variant="h2">Error</Typography>
      </div>
    </>
  );
};

export default Error;
